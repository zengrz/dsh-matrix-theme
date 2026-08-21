/**
 * Rain quality preference: the user-tunable performance level of the
 * digital-rain backdrop. Owned by this plugin (like the theme preference),
 * persisted whole-string to localStorage under a private key; storage
 * failures (private mode, quota) only disable persistence, never the
 * in-memory state. The engine maps the level to render knobs, and the
 * backdrop entry renders nothing at 'off' (the matrix palette stays).
 */

/** Rain performance levels: the full effect, the halved-density cut, or none. */
export type RainQuality = 'full' | 'lite' | 'off'

/** The persisted preference levels, in settings-row order. */
export const RAIN_QUALITIES: readonly RainQuality[] = ['full', 'lite', 'off']

/** localStorage key for the rain quality preference. */
const STORAGE_KEY = 'dsh-matrix-theme:rain-quality'

/** Whether a stored string names a rain quality level. */
const isRainQuality = (value: string): value is RainQuality =>
  (RAIN_QUALITIES as readonly string[]).includes(value)

/**
 * Read the persisted rain quality; unreadable or unknown storage falls back
 * to 'full' (the reference effect).
 * @returns the stored level, or 'full'.
 */
export function loadRainQuality(): RainQuality {
  if (typeof localStorage === 'undefined') return 'full'
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw !== null && isRainQuality(raw) ? raw : 'full'
  } catch {
    // Storage failures fall back silently (the runtime store's contract).
    return 'full'
  }
}

/**
 * Persist the rain quality; storage failures are non-fatal — the in-memory
 * state still governs the running session.
 * @param quality - the level to persist.
 */
export function saveRainQuality(quality: RainQuality): void {
  if (typeof localStorage === 'undefined') return
  try {
    localStorage.setItem(STORAGE_KEY, quality)
  } catch {
    // Same non-fatal contract as the runtime store's persistence.
  }
}
