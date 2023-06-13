import { Box, BoxProps } from '@mui/material'
import { MuiStyles } from '../../common/interfaces'

export interface ChangelogSectionProps extends BoxProps {
    // The version of the changelog.
    version: string

    // The release date of the version (format: "MM/DD/YYYY").
    releaseDate: string
}

/**
 * Changelog section.
 */
export const ChangelogSection = function(props: ChangelogSectionProps) {
    const { version, releaseDate, children } = props
    const styles: MuiStyles<'root' | 'title' | 'publishDate' | 'children'> = {
        root: {
            marginTop: '1em',
            '& ul': { margin: 0, paddingLeft: '2em' },
            '& li': { margin: '0.4em 0' },
        },
        title: {
            display: 'block',
            fontSize: '2em',
            borderLeft: '0.35em solid cornflowerblue',
            borderBottom: '1px solid cornflowerblue',
            paddingLeft: '0.35em',
        },
        publishDate: {
            display: 'inline-block',
            color: '#999999',
            fontSize: '0.5em',
            marginLeft: '1em',
        },
        children: {
            marginTop: '0.5em',
        },
    }

    return (
        <Box sx={styles.root}>
            <Box sx={styles.root}>
                {version}
                <Box sx={styles.publishDate}>{releaseDate}</Box>
            </Box>

            <Box sx={styles.children}>{children}</Box>
        </Box>
    )
}
