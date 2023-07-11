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
            paddingTop: '1rem',
            paddingBottom: '1rem',
            minHeight: `calc(100vh - ${navigationHeight})`,

            [theme.breakpoints.down('sm')]: {
                paddingLeft: '0.5rem',
                paddingRight: '0.5rem',
                minHeight: `calc(100vh - ${navigationHeight})`,
                paddingBottom: `calc(${bottomNavigationHeight} + 1rem)`,
            },
            [theme.breakpoints.up('sm')]: {
                paddingLeft: '1rem',
                paddingRight: '1rem',
            },
            [theme.breakpoints.up('lg')]: {
                paddingLeft: '10%',
                paddingRight: '10%',
            },
            [theme.breakpoints.up('xl')]: {
                paddingLeft: '15%',
                paddingRight: '15%',
            },
            ...sx,
        }),
    })

    return (
        <Box sx={styles.root} {...otherProps} />
    )
}