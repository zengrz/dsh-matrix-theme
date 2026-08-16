/**
 * Matrix theme plugin, browser half: registers the `matrix` theme into the
 * theme service (alias-token overrides on the dark base palette), then
 * contributes its two surfaces — the General-section toggle row and the
 * frame-wide digital-rain backdrop — both reading one shared mirror store of
 * the theme snapshot. The store's only writer is the apply-world
 * `theme/change` listener; the toggle's inject face routes preference writes
 * back through `ctx.theme.setTheme`, remembering the preference it replaced
 * so switching off restores it. The theme registration and every
 * subscription ride the plugin fiber (HMR safety).
 */
import type { ClientContext } from '@deepseek-ai/dsh-client-runtime/client'
import type { BoundActions } from '@deepseek-ai/dsh-client-ui-slots'
// Type-only: pulls ctx.theme and the ThemeSnapshot/ThemeDefinition types.
import type { ThemeSnapshot } from '@deepseek-ai/dsh-client-ui-theme/client'
// Type-only: pulls the settings.general.item slot declaration.
import type {} from '@deepseek-ai/dsh-client-ui-settings/client'
// Type-only: pulls the shell.backdrop slot declaration.
import type {} from '@deepseek-ai/dsh-client-ui-layout/client'
// Type-only: pulls the locale plugin's Context merge (ctx.locale).
import type {} from '@deepseek-ai/dsh-client-locale/client'
import { MATRIX_THEME, THEME_ID } from './matrix-tokens.ts'
import { createMatrixThemeStore } from './store.ts'
import type { MatrixRowInjected } from './MatrixRow.tsx'
import { MatrixRow } from './MatrixRow.tsx'
import { MatrixRain } from './MatrixRain.tsx'
import { en, zh, type MatrixKey } from './locales.ts'

declare module '@deepseek-ai/dsh-client-ui-slots' {
  interface LocaleNamespaceMap {
    /** The Matrix toggle row's copy. */
    matrix: MatrixKey
  }
}

/** Dictionary namespace owned by this plugin. */
const NS = 'matrix'

/**
 * Whether the persisted preference is the matrix theme id. The preference
 * union declares only the built-in ids, but the theme service stores any
 * registered id verbatim (its own `setTheme` widens the union the same way),
 * so the read is a string comparison.
 * @param preference - the persisted preference from a theme snapshot.
 */
const isMatrixPreference = (preference: ThemeSnapshot['preference']): boolean =>
  (preference as string) === THEME_ID

/** Required services: theme (register + snapshots), slots, and copy. */
export const inject = ['slots', 'theme', 'locale']

/**
 * Client plugin body: theme registration, dictionary, mirror store, and the
 * two slot entries.
 * @param ctx - client root context.
 */
export function apply(ctx: ClientContext): void {
  ctx.effect(() => ctx.locale.register(NS, { zh, en }), 'ui-matrix-theme: dictionaries')

  const store = createMatrixThemeStore()
  // One shared store behind both entries: whichever entry's bound actions
  // sync last writes the same underlying state, so a single binding suffices.
  let bound: BoundActions<typeof store> | undefined
  // The preference this plugin replaced; switching off restores it.
  let restoreTo: string | undefined

  const sync = (snapshot: ThemeSnapshot): void => {
    bound?.sync(isMatrixPreference(snapshot.preference), snapshot.active.id === THEME_ID, snapshot.revision)
  }
  ctx.effect(() => ctx.on('theme/change', sync), 'ui-matrix-theme: theme sync')

  // Registration emits theme/change synchronously; disposal resets the
  // preference when matrix was active (the service's own guarantee).
  ctx.effect(() => ctx.theme.register(MATRIX_THEME), 'ui-matrix-theme: theme registration')

  const rowInject = (actions: BoundActions<typeof store>): MatrixRowInjected => {
    bound = actions
    // Seal the pre-binding window: replay the current snapshot once.
    sync(ctx.theme.getTheme())
    return {
      setMatrix: (on) => {
        const preference = ctx.theme.getTheme().preference
        if (on) {
          if (!isMatrixPreference(preference)) restoreTo = preference
          ctx.theme.setTheme(THEME_ID)
        } else {
          ctx.theme.setTheme(restoreTo ?? 'system')
        }
      },
    }
  }

  const rainInject = (actions: BoundActions<typeof store>): Record<string, never> => {
    bound = actions
    sync(ctx.theme.getTheme())
    return {}
  }

  ctx.slots.inject('settings.general.item', () => ctx.slots.register({
    name: 'settings.general.item',
    id: 'matrix',
    order: 11,
    store,
    locale: NS,
    inject: rowInject,
  }, MatrixRow))

  ctx.slots.inject('shell.backdrop', () => ctx.slots.register({
    name: 'shell.backdrop',
    id: 'matrix-rain',
    order: 0,
    store,
    inject: rainInject,
  }, MatrixRain))
}
