/** `matrix` namespace dictionaries (the Matrix toggle row's copy). */

/** Simplified Chinese dictionary (the key-set source of truth). */
export const zh = {
  'matrix.title': '矩阵主题',
  'matrix.on': '已开启',
  'matrix.off': '已关闭',
  'matrix.opacity': '雨幕透明度',
} satisfies Record<string, string>

/** The matrix namespace key union. */
export type MatrixKey = keyof typeof zh

/** English dictionary, checked complete against the zh key set. */
export const en = {
  'matrix.title': 'Matrix theme',
  'matrix.on': 'On',
  'matrix.off': 'Off',
  'matrix.opacity': 'Rain opacity',
} satisfies Record<MatrixKey, string>
