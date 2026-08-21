/**
 * Matrix theme preference row registered into the General section item slot
 * directly under the Appearance row: title + one switch toggle + an opacity
 * slider. Selection follows the persisted preference (never the resolved
 * active theme) and mirrors the Appearance row's structure; switching on
 * remembers the previous preference in the apply closure and restores it when
 * switched off. Copy rides the standard locale seat.
 */
import clsx from 'clsx'
import type { PropsLocale, PropsRuntime, PropsStore } from '@deepseek-ai/dsh-client-ui-slots'
import type {} from '@deepseek-ai/dsh-client-ui-settings/client'
import type { createMatrixThemeStore } from './store.ts'
import css from './MatrixRow.module.css'

/** Injected business face: the preference write + opacity write (t rides the standard locale seat). */
export interface MatrixRowInjected {
  /** Switch the matrix preference on (restoring later) or off. */
  setMatrix: (on: boolean) => void
  /** Set the rain veil opacity (0..1), persisted to localStorage. */
  setOpacity: (opacity: number) => void
}

/** Full component props: runtime share + store share + locale seat + injected face. */
export type MatrixRowComponentProps =
  PropsRuntime<'settings.general.item'> & PropsStore<ReturnType<typeof createMatrixThemeStore>>
  & PropsLocale<'matrix'> & MatrixRowInjected

/**
 * Render the Matrix theme row with toggle + opacity slider.
 * @param props - composed slot props.
 * @returns the row element tree.
 */
export function MatrixRow({ t, setMatrix, setOpacity, useStore }: MatrixRowComponentProps) {
  const on = useStore(s => s.preference)
  const opacity = useStore(s => s.opacity)
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
      {on && (
        <div className={css.opacityRow}>
          <span className={css.opacityLabel}>{t('matrix.opacity')}</span>
          <input
            type="range"
            min={0}
            max={1}
            step={0.05}
            value={opacity}
            className={css.slider}
            onChange={(e) => { setOpacity(Number.parseFloat(e.target.value)) }}
          />
        </div>
      )}
    </div>
  )
}
