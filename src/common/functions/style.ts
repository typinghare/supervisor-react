import { SxProps } from '@mui/material'

export type MuiStyle<Theme extends object = any> = SxProps<Theme>

export type MuiStyles<Theme extends object = any> = Record<string, MuiStyle<Theme>>

export function collectStyles<Styles extends MuiStyles>(styles: Styles): { [T in keyof Styles]: MuiStyle } {
    return styles
}