/** `matrix` namespace dictionaries (the Matrix toggle row's copy). */

/** Simplified Chinese dictionary (the key-set source of truth). */
export const zh = {
  'matrix.title': '矩阵主题',
  'matrix.on': '已开启',
  'matrix.off': '已关闭',
  'matrix.quality.title': '数字雨特效',
  'matrix.quality.full': '完整',
  'matrix.quality.lite': '轻量',
  'matrix.quality.off': '关闭',
} satisfies Record<string, string>

/** The matrix namespace key union. */
export type MatrixKey = keyof typeof zh

/** English dictionary, checked complete against the zh key set. */
export const en = {
  'matrix.title': 'Matrix theme',
  'matrix.on': 'On',
  'matrix.off': 'Off',
  'matrix.quality.title': 'Rain effects',
  'matrix.quality.full': 'Full',
  'matrix.quality.lite': 'Lite',
  'matrix.quality.off': 'Off',
} satisfies Record<MatrixKey, string>
