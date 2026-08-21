/**
 * Rain quality preference row registered into the General section item slot
 * directly under the Matrix theme row: title + three level buttons (Full /
 * Lite / Off). The row renders only while the resolved active theme is
 * matrix — the rain runs only then, so its tunable is contextual and the
 * rest of the settings stay clean. Selection reads the mirror store's
 * quality; the injected write updates the store and persists the level
 * (the inject closure owns persistence, mirroring how setMatrix owns the
 * theme-preference write). Copy rides the standard locale seat.
 */
import clsx from 'clsx'
import type { PropsLocale, PropsRuntime, PropsStore } from '@deepseek-ai/dsh-client-ui-slots'
import type {} from '@deepseek-ai/dsh-client-ui-settings/client'
import type { RainQuality } from './rain-quality.ts'
import type { MatrixKey } from './locales.ts'
import type { createMatrixThemeStore } from './store.ts'
import css from './MatrixQualityRow.module.css'

/** Injected business face: the quality write (t rides the standard locale seat). */
export interface MatrixQualityRowInjected {
  /** Set the rain quality level (persisted by the apply-world inject closure). */
  setQuality: (quality: RainQuality) => void
}

/** Full component props: runtime share + store share + locale seat + injected face. */
export type MatrixQualityRowComponentProps =
  PropsRuntime<'settings.general.item'> & PropsStore<ReturnType<typeof createMatrixThemeStore>>
  & PropsLocale<'matrix'> & MatrixQualityRowInjected

/** Level buttons in row order. */
const LEVELS: readonly { id: RainQuality; labelKey: MatrixKey }[] = [
  { id: 'full', labelKey: 'matrix.quality.full' },
  { id: 'lite', labelKey: 'matrix.quality.lite' },
  { id: 'off', labelKey: 'matrix.quality.off' },
]

/**
 * Render the rain quality row.
 * @param props - composed slot props.
 * @returns the row element tree, or null while matrix is not the active theme.
 */
export function MatrixQualityRow({ t, setQuality, useStore }: MatrixQualityRowComponentProps) {
  const active = useStore(s => s.active)
  const quality = useStore(s => s.quality)
  if (!active) return null
  return (
    <div className={css.group}>
      <div className={css.title}>{t('matrix.quality.title')}</div>
      <div className={css.levels}>
        {LEVELS.map(({ id, labelKey }) => (
          <button
            key={id}
            type="button"
            className={clsx(css.level, quality === id && css.selected)}
            aria-pressed={quality === id}
            onClick={() => { setQuality(id) }}
          >
            {t(labelKey)}
          </button>
        ))}
      </div>
    </div>
  )
}
