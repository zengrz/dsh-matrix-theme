/**
 * Matrix theme mirror store: a projection of the theme service snapshot that
 * the toggle row, the rain quality row, and the rain overlay share. The
 * plugin's apply-world `theme/change` listener is the only writer of the
 * mirror fields; the quality level rides the quality row's `setQuality`
 * action (its persistence is the quality row's inject closure, not this
 * store — the runtime's store persistence would also persist the mirror
 * fields, whose rehydrated revision would block fresh-session sync).
 * Components read through props.useStore. One handle serves every slot
 * entry (the renderer binds each entry's actions to the same underlying
 * store).
 */
import { defineStore, type EngineStoreHandle } from '@deepseek-ai/dsh-client-runtime/client'
import type { RainQuality } from './rain-quality.ts'

/** Store state mirrored from the theme snapshot plus the rain quality preference. */
export interface MatrixThemeState {
  /** Whether the matrix theme is the persisted preference (toggle reads this). */
  preference: boolean
  /** Whether the resolved active theme is matrix (rain overlay reads this). */
  active: boolean
  /** The user-tunable rain performance level (rain overlay and quality row read this). */
  quality: RainQuality
  /** Service revision; -1 until first sync so revision 0 lands as a change. */
  revision: number
}

/** Declared action shape giving the exported factory a stable return type. */
type MatrixThemeActions = {
  sync: (draft: MatrixThemeState, preference: boolean, active: boolean, revision: number) => void
  /** Set the rain quality level (the quality row's only write). */
  setQuality: (draft: MatrixThemeState, quality: RainQuality) => void
}

/**
 * Declares the matrix mirror state and write surface.
 * @param initialQuality - the quality level loaded from the persisted preference.
 * @returns the store handle.
 */
export function createMatrixThemeStore(initialQuality: RainQuality): EngineStoreHandle<MatrixThemeState, MatrixThemeActions> {
  return defineStore({
    init: (): MatrixThemeState => ({ preference: false, active: false, quality: initialQuality, revision: -1 }),
    actions: {
      sync: (d, preference, active, revision) => {
        if (revision <= d.revision) return
        d.preference = preference
        d.active = active
        d.revision = revision
      },
      setQuality: (d, quality) => {
        d.quality = quality
      },
    },
  })
}
