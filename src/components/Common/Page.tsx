import { Box, BoxProps, Theme } from '@mui/material'
import { collectStyles } from '../../common/functions/style'
import { navigationHeight } from '../Layout/Navigation'
import { bottomNavigationHeight } from '../App'

export interface PageProps extends BoxProps {
}

export function Page(props: PageProps): JSX.Element {
    const { sx, ...otherProps } = props

    const styles = collectStyles({
        root: (theme: Theme) => ({
            margin: '0',
            maxWidth: '100vw',

            [theme.breakpoints.down('sm')]: {
                padding: '1em 0.5em',
                minHeight: `calc(100vh + ${bottomNavigationHeight})`,
            },
            [theme.breakpoints.up('sm')]: {
                padding: '1em 1em',
                minHeight: `calc(100vh - ${navigationHeight})`,
            },
            [theme.breakpoints.up('lg')]: {
                padding: '1em 10%',
            },
            [theme.breakpoints.up('xl')]: {
                padding: '1em 15%',
            },
            ...sx,
        }),
    })

    return (
        <Box sx={styles.root} {...otherProps} />
    )
}