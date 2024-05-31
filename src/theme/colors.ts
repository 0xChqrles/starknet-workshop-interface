// Based mostly on https://github.com/Uniswap/interface/blob/main/src/theme/index.tsx

const colors = {
  white: '#FFFFFF',
  black: '#000000',

  neutral1_dark: '#f7f7f7',
  neutral2_dark: 'rgba(235, 235, 245, 0.5)',

  error_dark: '#ff0030',
}

const commonTheme = {
  white: colors.white,
  black: colors.black,

  accent1: '#4A00E0',
  accent2: '#8E2DE2',
}

export const darkTheme = {
  ...commonTheme,

  bg1: '#0D1114',
  bg2: '#191B1D',

  border1: '#191B1D',

  neutral1: colors.neutral1_dark,
  neutral2: colors.neutral2_dark,

  error: colors.error_dark,
}
