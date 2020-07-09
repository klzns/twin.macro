/* eslint-disable-next-line import/no-unassigned-import */
import 'react'

export interface TwStyle {
  [key: string]: string | number | TwStyle
}

export interface ThemeStyle {
  [key: string]: string | number | ThemeStyle
}

export type TemplateFn<R> = (
  strings: Readonly<TemplateStringsArray>,
  ...values: readonly string[]
) => R

export type TwFn = TemplateFn<TwStyle>

export type ThemeSearchFn<R> = (...values: readonly string[]) => R
export type ThemeSearchTaggedFn<R> = (
  strings: Readonly<TemplateStringsArray>
) => R

export type ThemeFn = ThemeSearchFn<ThemeStyle> &
  ThemeSearchTaggedFn<ThemeStyle>

export type TwComponent<K extends keyof JSX.IntrinsicElements> = (
  props: JSX.IntrinsicElements[K]
) => JSX.Element

export type TwComponentMap = {
  [K in keyof JSX.IntrinsicElements]: TemplateFn<TwComponent<K>>
}

declare const tw: TwFn & TwComponentMap
export default tw

declare module 'react' {
  interface DOMAttributes<T> {
    tw?: string
  }
}

declare global {
  namespace JSX {
    interface IntrinsicAttributes {
      tw?: string
    }
  }
}

declare const theme: ThemeFn
export { theme }
