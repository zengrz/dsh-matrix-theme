/**
 * Matrix theme preference row registered into the General section item slot
 * directly under the Appearance row: title + one switch toggle. Selection
 * follows the persisted preference (never the resolved active theme) and
 * mirrors the Appearance row's structure; switching on remembers the
 * previous preference in the apply closure and restores it when switched
 * off. Copy rides the standard locale seat.
 */
import clsx from 'clsx'
import type { PropsLocale, PropsRuntime, PropsStore } from '@deepseek-ai/dsh-client-ui-slots'
import type {} from '@deepseek-ai/dsh-client-ui-settings/client'
import type { createMatrixThemeStore } from './store.ts'
import css from './MatrixRow.module.css'

/** Injected business face: the preference write (t rides the standard locale seat). */
export interface MatrixRowInjected {
  /** Switch the matrix preference on (restoring later) or off. */
  setMatrix: (on: boolean) => void
}

/** Full component props: runtime share + store share + locale seat + injected face. */
export type MatrixRowComponentProps =
  PropsRuntime<'settings.general.item'> & PropsStore<ReturnType<typeof createMatrixThemeStore>>
  & PropsLocale<'matrix'> & MatrixRowInjected

/**
 * Render the Matrix theme row.
 * @param props - composed slot props.
 * @returns the row element tree.
 */
export function MatrixRow({ t, setMatrix, useStore }: MatrixRowComponentProps) {
  const on = useStore(s => s.preference)
  return (
    <div className={css.group}>
      <div className={css.title}>{t('matrix.title')}</div>
      <button
        type="button"
        role="switch"
        aria-checked={on}
        className={clsx(css.toggle, on && css.on)}
        onClick={() => { setMatrix(!on) }}
      >
        <span className={css.knob} aria-hidden="true" />
        <span className={css.state}>{t(on ? 'matrix.on' : 'matrix.off')}</span>
      </button>
    </div>
  )
}
