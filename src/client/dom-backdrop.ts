/**
 * Direct-DOM fallback backdrop for harnesses that predate the `shell.backdrop`
 * slot (the ambient backdrop slot landed in a later dsh release than the one
 * this plugin may be installed against). When the slot is undeclared, the
 * plugin's `slots.inject('shell.backdrop', …)` callback never fires — the
 * registration is silently dropped — so this module mounts the same RainEngine
 * behind the app root via a fixed, click-through canvas layer instead.
 *
 * The layer mirrors the slot-based MatrixRain's structure (canvas + translucent
 * veil) and reuses the same engine, the same `prefers-reduced-motion` gate, and
 * the same theme-active condition. The disposer removes the layer, the
 * promoted-<style> tag, and the engine; the caller (the plugin's apply
 * closure) runs it from a `setTimeout(0)` that fires after synchronous boot so
 * ui-layout has already declared its slots (or not) by the time the check runs.
 */
import type { ClientContext } from '@deepseek-ai/dsh-client-runtime/client'
import { THEME_ID } from './matrix-tokens.ts'
import { RainEngine } from './rain-engine.ts'
import { prefersReducedMotion } from './MatrixRain.tsx'

/**
 * Mount a fixed-position canvas behind the app root, driving the same
 * RainEngine as the slot-based MatrixRain. The layer is click-through and
 * sits at z-index 0; a companion <style> promotes `#root` to z-index 1 so
 * the rain stays behind every column. The disposer removes all three
 * (layer, style, engine) and stops the rAF loop.
 * @param ctx - client root context (for theme snapshots).
 * @returns disposer that tears down the layer and the engine.
 */
export function mountDomBackdrop(ctx: ClientContext): () => void {
  if (prefersReducedMotion()) return () => {}

  const layer = document.createElement('div')
  layer.setAttribute('aria-hidden', 'true')
  layer.style.cssText = 'position:fixed;inset:0;z-index:0;pointer-events:none;overflow:hidden'

  const canvas = document.createElement('canvas')
  canvas.style.cssText = 'width:100%;height:100%;display:block'

  const veil = document.createElement('div')
  veil.setAttribute('aria-hidden', 'true')
  // Same veil opacity as the slot-based MatrixRain (MatrixRain.module.css .veil).
  veil.style.cssText = 'position:absolute;inset:0;background:#0000008c'

  layer.append(canvas, veil)
  document.body.prepend(layer)

  // Promote the app root above the fixed canvas so the rain stays behind
  // content. The dsh web shell mounts into <div id="root"> (apps/web/index.html).
  const promoted = document.createElement('style')
  promoted.textContent = 'body > #root{position:relative;z-index:1}'
  document.head.append(promoted)

  let engine: RainEngine | null = null

  const sync = (): void => {
    const active = ctx.theme.getTheme().active.id === THEME_ID
    if (active && engine === null) {
      engine = new RainEngine(canvas)
      engine.start()
    } else if (!active && engine !== null) {
      engine.dispose()
      engine = null
    }
  }
  sync()

  const offTheme = ctx.on('theme/change', sync)
  const onResize = (): void => { engine?.resize() }
  window.addEventListener('resize', onResize)

  return () => {
    window.removeEventListener('resize', onResize)
    offTheme()
    engine?.dispose()
    layer.remove()
    promoted.remove()
  }
}
