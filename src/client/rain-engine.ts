/**
 * The digital-rain background engine: a requestAnimationFrame loop painting
 * the glyph wall from https://github.com/zengrz/zengrz.github.io
 * (js/matrix3d.js + js/util.js) as the matrix theme's backdrop. This is a
 * faithful port of that page's live effect, so the backdrop IS that rain:
 *
 * - every frame fills the canvas with opaque black, then draws a full-height
 *   grid of glyph columns (hiragana/katakana/hangul) at the canvas default
 *   font — the reference never assigns a font to the wall glyphs;
 * - each glyph has a small per-frame chance of being replaced (churn), and
 *   glyphs inside the cursor spotlight radius — or on the column's marching
 *   "selected" cell — draw white at a smaller serif size;
 * - every column carries a depth z in [-DELTA_Z, DELTA_Z]; its glyphs draw
 *   with alpha (z + DELTA_Z) / (2 * DELTA_Z), so nearer columns read brighter;
 * - the cursor's per-event deltas tilt every column around the canvas center
 *   (the reference's 3D rotation; z-axis rotation is a no-op there and is
 *   omitted here), deltas reset after each frame.
 *
 * The upstream falling `DropText` characters are commented out in the
 * reference's own loop and are not part of its live effect, so this port
 * draws only the column wall. The engine owns the rAF lifetime, the cursor
 * listener, and the per-resize rebuild; the component owns construction,
 * activation, resize forwarding, and disposal.
 */
const FONT_SIZE = 20
/** Marked (spotlighted/selected) glyphs draw white at this smaller size. */
const MARKED_FONT_SIZE = 15
/**
 * Plain glyphs draw at this font — the canvas default. The reference never
 * assigns a font to its wall glyphs, so they render at the default; the port
 * names it so the wall font is pinned instead of implicit.
 */
const DEFAULT_FONT = '10px sans-serif'
/** Glyph alphabet: hiragana, katakana, and hangul (the reference's exact sets). */
const GLYPHS = 'あいうえおかきくけこがぎぐげごさしすせそざじずぜぞたちつてとだぢづでどなにぬねのはひふへほばびぶべぼぱぴぷぺぽまみむめもやゆよらりるれろわをん'
  + 'アイウエオカキクケコガギグゲゴサシスセソザジズゼゾタチツテトダヂヅデドナニヌネノハヒフヘホバビブベボパピプペポマミムメモヤユヨラリルレロワヲン'
  + 'ㄱㄲㄴㄷㄸㄹㅁㅂㅃㅅㅏㅐㅑㅒㅓㅔㅕㅖㅗㅘ'
/** Column depth range: z in [-DELTA_Z, DELTA_Z] maps to alpha 0..1. */
const DELTA_Z = 90
/** Per-frame cursor-delta rotation amplitude (the reference's constant). */
const AMPLITUDE = 0.00001
/** Cursor spotlight radius in px. */
const SPOTLIGHT_RADIUS = 50
/** Per-frame probability that one glyph is replaced with a fresh one. */
const CHURN_PROBABILITY = 0.99
/** Green glyph color template (the reference's rgba(0, 255, 0, alpha)). */
const GREEN = 'rgba(0, 255, 0, '
/** White glyph color template (the reference's rgba(255, 255, 255, alpha)). */
const WHITE = 'rgba(255, 255, 255, '
/** Background fill: the reference's opaque black page. */
const BACKGROUND = '#000'

/** Pick one glyph from the alphabet. */
function randomGlyph(): string {
  return GLYPHS.charAt(Math.floor(Math.random() * GLYPHS.length))
}

/**
 * Depth-based opacity for a column z in [-DELTA_Z, DELTA_Z] (the reference's
 * `getAlpha`): nearer columns draw brighter, the farthest fade to zero.
 * @param z - column depth.
 * @returns the column opacity in [0, 1].
 */
export function depthAlpha(z: number): number {
  return (z + DELTA_Z) / (2 * DELTA_Z)
}

/** One full-height glyph column with its 3D position and marching highlight. */
interface RainColumn {
  /** Column position (rotated around the canvas center every frame). */
  x: number
  y: number
  z: number
  /** One glyph per cell, top to bottom. */
  glyphs: string
  /** Index of the cell drawing white this frame (marches down the column). */
  selected: number
  /** Frames between selected-cell advances. */
  moveDelay: number
  /** Frames elapsed since the last selected-cell advance. */
  delay: number
}

/**
 * Rotate a point around the X axis through the canvas center (the reference's
 * rotateXAxis).
 * @param x - point x.
 * @param y - point y.
 * @param z - point z.
 * @param cy - center y.
 * @param angle - rotation angle in radians.
 * @returns the rotated [x, y, z].
 */
export function rotateXAxis(x: number, y: number, z: number, cy: number, angle: number): [number, number, number] {
  const dy = y - cy
  const dz = z
  const y1 = dy * Math.cos(angle) - dz * Math.sin(angle)
  const z1 = dy * Math.sin(angle) + dz * Math.cos(angle)
  return [x, y1 + cy, z1]
}

/**
 * Rotate a point around the Y axis through the canvas center (the reference's
 * rotateYAxis).
 * @param x - point x.
 * @param y - point y.
 * @param z - point z.
 * @param cx - center x.
 * @param angle - rotation angle in radians.
 * @returns the rotated [x, y, z].
 */
export function rotateYAxis(x: number, y: number, z: number, cx: number, angle: number): [number, number, number] {
  const dx = x - cx
  const dz = z
  const x1 = dz * Math.sin(angle) + dx * Math.cos(angle)
  const z1 = dz * Math.cos(angle) - dx * Math.sin(angle)
  return [x1 + cx, y, z1]
}

/** The digital-rain background engine; one instance per mounted backdrop canvas. */
export class RainEngine {
  private readonly canvas: HTMLCanvasElement
  private readonly ctx: CanvasRenderingContext2D | null
  /** Per-column state, rebuilt on every resize (the reference's semantics). */
  private columns: RainColumn[] = []
  private frame: number | null = null
  /** Cursor position and per-event deltas for the tilt and the spotlight. */
  private cursorX = 0
  private cursorY = 0
  private cursorDx = 0
  private cursorDy = 0
  private cursorSet = false

  /**
   * @param canvas - the backdrop canvas; a null 2D context (jsdom without the
   * canvas backend) leaves the engine inert rather than throwing.
   */
  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas
    this.ctx = canvas.getContext('2d')
  }

  /** Start the animation loop and the cursor listener; a second start while running is a no-op. */
  start(): void {
    if (this.ctx === null || this.frame !== null) return
    this.layout()
    window.addEventListener('mousemove', this.onMouseMove)
    this.frame = requestAnimationFrame(this.step)
  }

  /** Rebuild the columns after the canvas box changed size. */
  resize(): void {
    if (this.ctx === null) return
    this.layout()
  }

  /** Stop the animation loop and the cursor listener (the component's teardown path). */
  dispose(): void {
    if (this.frame !== null) {
      cancelAnimationFrame(this.frame)
      this.frame = null
    }
    window.removeEventListener('mousemove', this.onMouseMove)
  }

  /** Track the cursor: store the per-event delta for the frame's tilt and the position for the spotlight. */
  private readonly onMouseMove = (event: MouseEvent): void => {
    this.cursorDx += event.clientX - this.cursorX
    this.cursorDy += event.clientY - this.cursorY
    this.cursorX = event.clientX
    this.cursorY = event.clientY
  }

  /** Recompute the canvas backing size and rebuild the full column grid. */
  private layout(): void {
    const width = this.canvas.clientWidth
    const height = this.canvas.clientHeight
    this.canvas.width = width
    this.canvas.height = height
    if (!this.cursorSet) {
      // The reference starts its cursor at the viewport center.
      this.cursorX = width / 2
      this.cursorY = height / 2
      this.cursorSet = true
    }
    const columns = new Array<RainColumn>(Math.floor(width / FONT_SIZE))
    const rows = Math.floor(height / FONT_SIZE)
    for (let i = 0; i < columns.length; i += 1) {
      columns[i] = {
        x: i * FONT_SIZE,
        y: height / 2,
        z: -DELTA_Z + 2 * DELTA_Z * Math.random(),
        glyphs: Array.from({ length: rows }, randomGlyph).join(''),
        selected: 0,
        moveDelay: Math.floor(Math.random() * 10) + 1,
        delay: 0,
      }
    }
    this.columns = columns
  }

  /** One animation frame: draw, then schedule the next. */
  private readonly step = (): void => {
    this.draw()
    this.frame = requestAnimationFrame(this.step)
  }

  /** Paint the opaque background, tilt and redraw every column, then settle the cursor deltas. */
  private draw(): void {
    const ctx = this.ctx
    /* v8 ignore next -- start() gates the loop on a non-null context, so draw can only run with one */
    if (ctx === null) return
    const { width, height } = this.canvas
    ctx.fillStyle = BACKGROUND
    ctx.fillRect(0, 0, width, height)
    ctx.textBaseline = 'top'
    const cx = width / 2
    const cy = height / 2
    const thetaX = AMPLITUDE * this.cursorDy * Math.PI * 2
    const thetaY = AMPLITUDE * this.cursorDx * Math.PI * 2
    for (const column of this.columns) {
      ;[column.x, column.y, column.z] = rotateXAxis(column.x, column.y, column.z, cy, thetaX)
      ;[column.x, column.y, column.z] = rotateYAxis(column.x, column.y, column.z, cx, thetaY)
      const alpha = depthAlpha(column.z)
      for (let step = 0; step < column.glyphs.length; step += 1) {
        if (Math.random() > CHURN_PROBABILITY) {
          column.glyphs = column.glyphs.slice(0, step) + randomGlyph() + column.glyphs.slice(step + 1)
        }
        const x = column.x
        const y = column.y + step * FONT_SIZE - cy
        const marked = Math.hypot(this.cursorX - x, this.cursorY - y) < SPOTLIGHT_RADIUS || column.selected === step
        ctx.fillStyle = marked ? `${WHITE}${alpha})` : `${GREEN}${alpha})`
        ctx.font = marked ? `${MARKED_FONT_SIZE}px serif` : DEFAULT_FONT
        ctx.fillText(column.glyphs.charAt(step), x, y)
      }
      if (column.delay === column.moveDelay) {
        column.selected = (column.selected + 1) % column.glyphs.length
        column.delay = 0
      }
      column.delay += 1
    }
    this.cursorDx = 0
    this.cursorDy = 0
  }
}
