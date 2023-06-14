import { Box, BoxProps, SxProps, Theme } from '@mui/material'

export function Page(props: BoxProps): JSX.Element {
    const { sx, ...otherProps } = props

    const style: SxProps<any> = (theme: Theme) => ({
        margin: '0',
        maxWidth: '100vw',
        minHeight: 'calc(100vh - 4em)',
        [theme.breakpoints.down('sm')]: {
            margin: '2em 1em',
        },
        [theme.breakpoints.up('sm')]: {
            margin: '2em 5%',
        },
        [theme.breakpoints.up('lg')]: {
            margin: '2em 10%',
        },
        [theme.breakpoints.up('xl')]: {
            margin: '2em 15%',
        },

        ...sx,
    })

    return (
        <Box
            sx={style}
            {...otherProps}
        />
    )
}