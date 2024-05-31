import { getTheme } from './index'

type InferredTheme = ReturnType<typeof getTheme>

declare module 'styled-components' {
  // eslint-disable-next-line import/no-unused-modules
  export type DefaultTheme = InferredTheme
}
