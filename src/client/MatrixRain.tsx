/**
 * The ambient digital-rain backdrop: a frame-wide, click-through entry in
 * the `shell.backdrop` list slot that renders only while the resolved active
 * theme is matrix. The backdrop layer sits BELOW every column, so the rain
 * never paints over content; a translucent veil stacked above the canvas
 * inside this entry is the layer between the app content and the glyphs,
 * dimming the rain wherever the theme's surfaces are translucent or
 * transparent. The veil opacity is user-controlled via the store slider.
 * The entry owns nothing but the canvas and the RainEngine lifetime —
 * activation, resize forwarding, and disposal ride the component effects;
 * the active fact arrives through the shared mirror store.
 *
 * Under `prefers-reduced-motion: reduce` the entry renders nothing at all
 * (decorative motion is skipped entirely rather than frozen). The rain
 * quality level from the mirror store selects the engine's effort: 'full'
 * runs the reference effect, 'lite' the reduced-effort knobs, and 'off'
 * renders nothing (the matrix palette stays, the rain costs nothing).
 */
import { useEffect, useRef, useState } from 'react'
import type { PropsRuntime, PropsStore } from '@deepseek-ai/dsh-client-ui-slots'
import type {} from '@deepseek-ai/dsh-client-ui-layout/client'
import type { createMatrixThemeStore } from './store.ts'
import { RainEngine } from './rain-engine.ts'
import css from './MatrixRain.module.css'

/** Whether the environment asks for reduced motion (missing matchMedia = no). */
export function prefersReducedMotion(): boolean {
  return typeof matchMedia === 'function' && matchMedia('(prefers-reduced-motion: reduce)').matches
}

/** Full component props: runtime share + store share (the entry injects nothing). */
export type MatrixRainProps =
  PropsRuntime<'shell.backdrop'> & PropsStore<ReturnType<typeof createMatrixThemeStore>>

/**
 * Render the rain canvas under its translucent veil, or nothing while matrix
 * is inactive, motion is reduced, or the rain quality is off. The veil
 * opacity follows the store.
 * @param props - composed slot props.
 * @returns the backdrop element tree.
 */
export function MatrixRain({ useStore }: MatrixRainProps) {
  const active = useStore(s => s.active)
  const quality = useStore(s => s.quality)
  const opacity = useStore(s => s.opacity)
  // Environment fact read once per mount (like the frame's viewport width).
  const [reduced] = useState(prefersReducedMotion)
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  useEffect(() => {
    if (!active || reduced || quality === 'off') return
    const canvas = canvasRef.current
    /* v8 ignore next -- active renders the canvas in the same commit, so the ref is attached by effect time */
    if (canvas === null) return
    const engine = new RainEngine(canvas, quality)
    engine.start()
    const onResize = (): void => { engine.resize() }
    window.addEventListener('resize', onResize)
    return () => {
      window.removeEventListener('resize', onResize)
      engine.dispose()
    }
  }, [active, reduced, quality])
  if (!active || reduced || quality === 'off') return null
  return (
    <div className={css.layer}>
      <canvas ref={canvasRef} className={css.canvas} aria-hidden="true" />
      {/* The translucent layer between the app content (above) and the rain
          glyphs (below): it dims the backdrop without touching the content.
          The opacity is user-controlled via the store slider. */}
      <div
        className={css.veil}
        aria-hidden="true"
        style={{ backgroundColor: `rgba(0, 0, 0, ${opacity})` }}
      />
    </div>
  )
}
