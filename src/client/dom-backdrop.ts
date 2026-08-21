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
 * the same theme-active condition. The veil opacity is read from localStorage
 * (the store's persistence key) and updated on `storage` / custom events so the
 * slider stays live on this path too. The disposer removes the layer, the
 * promoted-<style> tag, and the engine; the caller (the plugin's apply
 * closure) runs it from a `setTimeout(0)` that fires after synchronous boot so
 * ui-layout has already declared its slots (or not) by the time the check runs.
 */
import type { ClientContext } from '@deepseek-ai/dsh-client-runtime/client'
import { THEME_ID } from './matrix-tokens.ts'
import { RainEngine } from './rain-engine.ts'
import { prefersReducedMotion } from './MatrixRain.tsx'

/** localStorage key (must match store.ts). */
const OPACITY_STORAGE_KEY = 'dsh-matrix-theme.veil-opacity'
/** Custom event the store dispatches on opacity write (for same-tab updates). */
const OPACITY_EVENT = 'dsh-matrix-theme:opacity'

/** Read the persisted opacity, clamped to [0, 1]; default 0.5. */
function readOpacity(): number {
  if (typeof localStorage === 'undefined') return 0.5
  const raw = localStorage.getItem(OPACITY_STORAGE_KEY)
  if (raw === null) return 0.5
  const v = Number.parseFloat(raw)
  return Number.isNaN(v) ? 0.5 : Math.max(0, Math.min(1, v))
}

/**
 * Mount a fixed-position canvas behind the app root, driving the same
 * RainEngine as the slot-based MatrixRain. The layer is click-through and
 * sits at z-index 0; a companion <style> promotes `#root` to z-index 1 so
 * the rain stays behind every column. The veil opacity follows the
 * persisted value (and live-updates from the settings slider). The disposer
 * removes all three (layer, style, engine) and stops the rAF loop.
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
  veil.style.cssText = 'position:absolute;inset:0'
  veil.style.backgroundColor = `rgba(0, 0, 0, ${readOpacity()})`

  layer.append(canvas, veil)
  document.body.prepend(layer)

  // Promote the app root above the fixed canvas so the rain stays behind
  // content. The dsh web shell mounts into <div id="root"> (apps/web/index.html).
  const promoted = document.createElement('style')
  promoted.textContent = 'body > #root{position:relative;z-index:1}'
  document.head.append(promoted)

  let engine: RainEngine | null = null

  // Live-update the veil opacity when the slider moves (same tab via custom
  // event, cross-tab via storage event).
  const onOpacity = (): void => { veil.style.backgroundColor = `rgba(0, 0, 0, ${readOpacity()})` }
  window.addEventListener(OPACITY_EVENT, onOpacity)
  window.addEventListener('storage', onOpacity)

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
    window.removeEventListener(OPACITY_EVENT, onOpacity)
    window.removeEventListener('storage', onOpacity)
    offTheme()
    engine?.dispose()
    layer.remove()
    promoted.remove()
  }
}

/** Dispatch the custom event so the DOM fallback updates its veil on slider change. */
export function notifyOpacityChange(): void {
  window.dispatchEvent(new Event(OPACITY_EVENT))
}
