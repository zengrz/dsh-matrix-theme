/**
 * Matrix theme mirror store: a projection of the theme service snapshot that
 * the toggle row and the rain overlay share. The plugin's apply-world
 * `theme/change` listener is the only writer of the theme-sync fields;
 * the opacity field is written by the settings slider and persisted to
 * localStorage. Components read through props.useStore. One handle serves
 * both slot entries (the renderer binds each entry's actions to the same
 * underlying store).
 */
import { defineStore, type EngineStoreHandle } from '@deepseek-ai/dsh-client-runtime/client'

/** localStorage key for the rain veil opacity (0..1). */
const OPACITY_STORAGE_KEY = 'dsh-matrix-theme.veil-opacity'

/** Default veil opacity if no persisted value exists. */
const DEFAULT_OPACITY = 0.5

/** Read the persisted opacity, clamped to [0, 1]. */
function readOpacity(): number {
  if (typeof localStorage === 'undefined') return DEFAULT_OPACITY
  const raw = localStorage.getItem(OPACITY_STORAGE_KEY)
  if (raw === null) return DEFAULT_OPACITY
  const v = Number.parseFloat(raw)
  return Number.isNaN(v) ? DEFAULT_OPACITY : Math.max(0, Math.min(1, v))
}

/** Store state mirrored from the theme snapshot + the user-controlled opacity. */
export interface MatrixThemeState {
  /** Whether the matrix theme is the persisted preference (toggle reads this). */
  preference: boolean
  /** Whether the resolved active theme is matrix (rain overlay reads this). */
  active: boolean
  /** Service revision; -1 until first sync so revision 0 lands as a change. */
  revision: number
  /** Rain veil opacity (0 = invisible, 1 = fully obscured). Persisted to localStorage. */
  opacity: number
}

/** Declared action shape giving the exported factory a stable return type. */
type MatrixThemeActions = {
  sync: (draft: MatrixThemeState, preference: boolean, active: boolean, revision: number) => void
  setOpacity: (draft: MatrixThemeState, opacity: number) => void
}

/**
 * Declares the matrix mirror state and write surface.
 * @returns the store handle.
 */
export function createMatrixThemeStore(): EngineStoreHandle<MatrixThemeState, MatrixThemeActions> {
  return defineStore({
    init: (): MatrixThemeState => ({
      preference: false,
      active: false,
      revision: -1,
      opacity: readOpacity(),
    }),
    actions: {
      sync: (d, preference, active, revision) => {
        if (revision <= d.revision) return
        d.preference = preference
        d.active = active
        d.revision = revision
      },
      setOpacity: (d, opacity) => {
        d.opacity = Math.max(0, Math.min(1, opacity))
        if (typeof localStorage !== 'undefined') {
          localStorage.setItem(OPACITY_STORAGE_KEY, String(d.opacity))
        }
      },
    },
  })
}
