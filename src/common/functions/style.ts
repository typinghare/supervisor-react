import { SxProps } from '@mui/material'

export type MuiStyle<Theme extends object = any> = SxProps<Theme>

export type MuiStyles<T extends string = any> = Record<T, MuiStyle>

export function collectStyles<Styles extends MuiStyles>(styles: Styles): { [T in keyof Styles]: MuiStyle } {
    return styles
}