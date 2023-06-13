import { SxProps } from '@mui/material'

export type MuiStyle<Theme extends object = any> = SxProps<Theme>

export type MuiStyles<T extends string> = {
    [name in T]: MuiStyle
}
