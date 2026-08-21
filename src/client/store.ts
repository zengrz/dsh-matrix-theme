/**
 * Matrix theme mirror store: a projection of the theme service snapshot that
 * the toggle row, the rain quality row, and the rain overlay share. The
 * plugin's apply-world `theme/change` listener is the only writer of the
 * theme-sync fields; the opacity and quality fields are written by the
 * settings rows' actions and persisted to localStorage (hand-rolled reads and
 * writes — the runtime's store persistence would also persist the mirror
 * fields, whose rehydrated revision would block fresh-session sync).
 * Components read through props.useStore. One handle serves every slot
 * entry (the renderer binds each entry's actions to the same underlying
 * store).
 */
import { defineStore, type EngineStoreHandle } from '@deepseek-ai/dsh-client-runtime/client'
import { saveRainQuality, type RainQuality } from './rain-quality.ts'

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

/** Store state mirrored from the theme snapshot + the user-controlled prefs. */
export interface MatrixThemeState {
  /** Whether the matrix theme is the persisted preference (toggle reads this). */
  preference: boolean
  /** Whether the resolved active theme is matrix (rain overlay reads this). */
  active: boolean
  /** The user-tunable rain performance level (rain overlay and quality row read this). */
  quality: RainQuality
  /** Service revision; -1 until first sync so revision 0 lands as a change. */
  revision: number
  /** Rain veil opacity (0 = invisible, 1 = fully obscured). Persisted to localStorage. */
  opacity: number
}

/** Declared action shape giving the exported factory a stable return type. */
type MatrixThemeActions = {
  sync: (draft: MatrixThemeState, preference: boolean, active: boolean, revision: number) => void
  /** Set the rain quality level (the quality row's only write). */
  setQuality: (draft: MatrixThemeState, quality: RainQuality) => void
  /** Set the rain veil opacity (the opacity slider's only write). */
  setOpacity: (draft: MatrixThemeState, opacity: number) => void
}

/**
 * Declares the matrix mirror state and write surface.
 * @param initialQuality - the quality level loaded from the persisted preference.
 * @returns the store handle.
 */
export function createMatrixThemeStore(initialQuality: RainQuality): EngineStoreHandle<MatrixThemeState, MatrixThemeActions> {
  return defineStore({
    init: (): MatrixThemeState => ({
      preference: false,
      active: false,
      quality: initialQuality,
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
      setQuality: (d, quality) => {
        d.quality = quality
        saveRainQuality(quality)
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
