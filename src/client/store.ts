/**
 * Matrix theme mirror store: a projection of the theme service snapshot that
 * the toggle row and the rain overlay share. The plugin's apply-world
 * `theme/change` listener is the only writer; components read through
 * props.useStore. One handle serves both slot entries (the renderer binds
 * each entry's actions to the same underlying store).
 */
import { defineStore, type EngineStoreHandle } from '@deepseek-ai/dsh-client-runtime/client'

/** Store state mirrored from the theme snapshot. */
export interface MatrixThemeState {
  /** Whether the matrix theme is the persisted preference (toggle reads this). */
  preference: boolean
  /** Whether the resolved active theme is matrix (rain overlay reads this). */
  active: boolean
  /** Service revision; -1 until first sync so revision 0 lands as a change. */
  revision: number
}

/** Declared action shape giving the exported factory a stable return type. */
type MatrixThemeActions = {
  sync: (draft: MatrixThemeState, preference: boolean, active: boolean, revision: number) => void
}

/**
 * Declares the matrix mirror state and write surface.
 * @returns the store handle.
 */
export function createMatrixThemeStore(): EngineStoreHandle<MatrixThemeState, MatrixThemeActions> {
  return defineStore({
    init: (): MatrixThemeState => ({ preference: false, active: false, revision: -1 }),
    actions: {
      sync: (d, preference, active, revision) => {
        if (revision <= d.revision) return
        d.preference = preference
        d.active = active
        d.revision = revision
      },
    },
  })
}
