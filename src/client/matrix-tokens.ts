/**
 * The matrix theme definition: the `matrix` theme id plus its alias-layer
 * token overrides, all resolved against the dark base palette
 * (`colorScheme: 'dark'` — the presenter keeps `body[data-ds-dark-theme]`
 * set, so every value below lands on the dark palette's static tokens).
 *
 * The override set covers the complete dark alias layer declared in
 * ui-theme's design-platform.css: every alias the dark palette defines has a
 * matrix value here, so no surface falls back to the default bluish dark
 * palette while the theme is active. Values are literal colors, repeated
 * through the named constants below rather than re-declared per alias.
 *
 * The base background is translucent: it is the layer between the app
 * content and the `shell.backdrop` entries behind the columns, letting the
 * ambient backdrop (the digital rain) read through at reduced strength while
 * text stays opaque on top. The sidebar fill stays solid instead, so its
 * controls sit on a readable surface rather than on the animated backdrop.
 */
import type { ThemeDefinition } from '@deepseek-ai/dsh-client-ui-theme/client'

/** Theme id: the `setTheme` argument and the toggle's selection key. */
export const THEME_ID = 'matrix'

/** Primary phosphor green (brand accent, interactive fills, success). */
const GREEN = 'rgb(0, 255, 65)'
/** Pressed/secondary green (hovering one step below the primary). */
const GREEN_DIM = 'rgb(0, 209, 66)'
/** Bright green (primary-fill hover, trailing highlights). */
const GREEN_BRIGHT = 'rgb(77, 255, 132)'
/** Primary text: near-white phosphor green. */
const TEXT = 'rgb(198, 255, 213)'
/** Secondary text. */
const TEXT_SECONDARY = 'rgb(102, 197, 132)'
/** Tertiary text. */
const TEXT_TERTIARY = 'rgb(73, 153, 99)'
/** Caption text. */
const TEXT_CAPTION = 'rgb(56, 120, 78)'
/** Pure black (inverted text on brand fills). */
const BLACK = 'rgb(0, 0, 0)'
/** Green-black surface ramp, darkest first. */
const BG_0 = 'rgb(0, 8, 3)'
const BG_1 = 'rgb(0, 13, 4)'
const BG_2 = 'rgb(0, 20, 7)'
const BG_3 = 'rgb(0, 27, 9)'
const BG_4 = 'rgb(0, 33, 12)'
/** Translucent base surface: the layer over `shell.backdrop` entries. */
const BG_BASE_VEILED = 'rgba(0, 0, 0, 0.75)'
/** Error pair (kept red: the only hue the matrix palette does not reclaim). */
const ERROR = 'rgb(255, 82, 82)'
const ERROR_BRIGHT = 'rgb(255, 130, 130)'
/** Warning pair (kept amber for the same reason). */
const WARN = 'rgb(255, 190, 60)'
const WARN_BRIGHT = 'rgb(255, 220, 120)'
const WARN_LABEL = 'rgb(255, 200, 80)'
/** Scrollbar ramp. */
const SCROLL_1 = 'rgb(0, 60, 20)'
const SCROLL_2 = 'rgb(0, 90, 30)'
const SCROLL_HOVER_1 = 'rgb(0, 100, 34)'
const SCROLL_HOVER_2 = 'rgb(0, 120, 40)'

/** The registered matrix theme definition. */
export const MATRIX_THEME: ThemeDefinition = {
  id: THEME_ID,
  colorScheme: 'dark',
  tokens: {
    // Base surfaces (translucent: the layer over the backdrop).
    '--dsw-alias-bg-base': BG_BASE_VEILED,
    '--dsw-alias-bg-layer-1': BG_1,
    '--dsw-alias-bg-layer-2': BG_2,
    '--dsw-alias-bg-layer-3': BG_3,
    '--dsw-alias-bg-module-platform': BG_3,
    '--dsw-alias-bg-multi-select': BG_2,
    '--dsw-alias-bg-overlay': BG_4,
    '--dsw-alias-bg-skeleton': 'rgba(0, 255, 65, 0.08)',
    '--dsw-alias-bg-mask-1': 'rgba(0, 0, 0, 0.5)',
    '--dsw-alias-bg-mask-2': 'rgba(0, 0, 0, 0.2)',
    '--dsw-alias-bg-mask-3': 'rgba(0, 0, 0, 0.48)',
    '--dsw-alias-bg-mask-photo': 'rgba(0, 0, 0, 0.88)',
    '--dsw-alias-bg-mask-drop': 'rgba(0, 13, 4, 0.7)',
    // Borders.
    '--dsw-alias-border-l1': 'rgba(0, 255, 65, 0.1)',
    '--dsw-alias-border-l2': 'rgba(0, 255, 65, 0.22)',
    '--dsw-alias-border-l2-darkmode-thin': 'rgba(0, 255, 65, 0.1)',
    '--dsw-alias-border-l3': 'rgba(0, 255, 65, 0.32)',
    '--dsw-alias-border-l4': 'rgba(0, 255, 65, 0.42)',
    '--dsw-alias-border-inverted': 'rgba(0, 255, 65, 0.1)',
    '--dsw-alias-border-inverted2': 'rgba(0, 255, 65, 0.14)',
    // Brand.
    '--dsw-alias-brand-primary': GREEN,
    '--dsw-alias-brand-primary-invert': BLACK,
    '--dsw-alias-brand-text': GREEN,
    '--dsw-alias-brand-primary-new-colorprimary-new-color': GREEN,
    // Buttons.
    '--dsw-alias-button-primary-fill': GREEN,
    '--dsw-alias-button-primary-hover': GREEN_BRIGHT,
    '--dsw-alias-button-primary-dimmed': BG_1,
    '--dsw-alias-button-contrast-fill': GREEN,
    '--dsw-alias-button-elevated-fill': BG_2,
    '--dsw-alias-button-floating-fill': BG_1,
    '--dsw-alias-button-floating-hover': BG_3,
    '--dsw-alias-button-ghost-active-fill': BG_3,
    '--dsw-alias-button-ghost-active-hover': BG_2,
    '--dsw-alias-button-ghost-active-border': GREEN_DIM,
    '--dsw-alias-button-info-fill': GREEN_DIM,
    '--dsw-alias-button-info-hover': GREEN,
    '--dsw-alias-button-tool-bar-fill-invisible': 'rgba(0, 255, 65, 0.1)',
    '--dsw-alias-button-tool-bar-fill': 'rgba(0, 255, 65, 0.14)',
    '--dsw-alias-button-tool-bar-hover': 'rgba(0, 255, 65, 0.2)',
    // Interactive states.
    '--dsw-alias-interactive-bg-hover': 'rgba(0, 255, 65, 0.06)',
    '--dsw-alias-interactive-bg-hover-solid': BG_3,
    '--dsw-alias-interactive-bg-hover-accent': 'rgba(0, 255, 65, 0.12)',
    '--dsw-alias-interactive-bg-hover-danger': 'rgba(255, 82, 82, 0.15)',
    '--dsw-alias-interactive-bg-active': 'rgba(0, 255, 65, 0.1)',
    // Labels.
    '--dsw-alias-label-primary': TEXT,
    '--dsw-alias-label-primary-bluish': TEXT,
    '--dsw-alias-label-primary-dimmed': GREEN_BRIGHT,
    '--dsw-alias-label-primary-foreground': BLACK,
    '--dsw-alias-label-primary-inverted': BG_3,
    '--dsw-alias-label-secondary': TEXT_SECONDARY,
    '--dsw-alias-label-tertiary': TEXT_TERTIARY,
    '--dsw-alias-label-caption': TEXT_CAPTION,
    '--dsw-alias-label-dimmed': BG_4,
    // Markdown surfaces.
    '--dsw-alias-markdown-code-block': BG_0,
    '--dsw-alias-markdown-code-block-banner': BG_1,
    '--dsw-alias-markdown-code-segment-selected': BG_3,
    '--dsw-alias-markdown-code-segment-unselected': BG_0,
    '--dsw-alias-markdown-inline-code': BG_1,
    '--dsw-alias-markdown-placeholder': BG_1,
    '--dsw-alias-markdown-tag': BG_1,
    '--dsw-alias-markdown-citation': BG_3,
    // Scrollbars.
    '--dsw-alias-scrollbar-bg-l1': SCROLL_1,
    '--dsw-alias-scrollbar-bg-l2': SCROLL_2,
    '--dsw-alias-scrollbar-hover-l1': SCROLL_HOVER_1,
    '--dsw-alias-scrollbar-hover-l2': SCROLL_HOVER_2,
    // States.
    '--dsw-alias-state-business-primary': GREEN,
    '--dsw-alias-state-business-tertiary': BG_2,
    '--dsw-alias-state-error-primary': ERROR,
    '--dsw-alias-state-error-secondary': ERROR_BRIGHT,
    '--dsw-alias-state-success-primary': GREEN,
    '--dsw-alias-state-success-secondary': GREEN_BRIGHT,
    '--dsw-alias-state-success-tertiary': BG_2,
    '--dsw-alias-state-warn-primary': WARN,
    '--dsw-alias-state-warn-secondary': WARN_BRIGHT,
    '--dsw-alias-state-warn-tertiary': BG_2,
    '--dsw-alias-state-warn-label': WARN_LABEL,
    // Popovers and transient surfaces.
    '--dsw-alias-toast-bg': BG_2,
    '--dsw-alias-tooltip-bg': BG_3,
    // Feature-specific surfaces.
    '--dsw-specific-bubble': BG_1,
    '--dsw-specific-bubble-highlight': BG_3,
    '--dsw-specific-input-major': BG_1,
    '--dsw-specific-login-input': BG_0,
    '--dsw-specific-menu': BG_3,
    '--dsw-specific-selector': BG_2,
    '--dsw-specific-sidebar-fill': BG_0,
    '--dsw-specific-sidebar-nav-item-active': BG_3,
    '--dsw-specific-sidebar-nav-item-active-accent': BG_4,
    '--dsw-specific-sidebar-nav-item-hover': BG_1,
    '--dsw-specific-tip': BG_3,
  },
}
