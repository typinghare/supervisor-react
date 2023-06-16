import { Box, Divider, Paper, PaperProps } from '@mui/material'
import { collectStyles } from '../../common/functions/style'

export interface ChangelogProps extends PaperProps {
    // The version of the changelog.
    version: string

    // The release date of the version (format: "MM/DD/YYYY").
    releaseDate: string
}

export function Changelog(props: ChangelogProps): JSX.Element {
    const { version, releaseDate, children, sx, ...otherProps } = props
    const styles = collectStyles({
        root: {
            marginTop: '1em',
            padding: '1em',
            '& ul': { margin: 0, paddingLeft: '2em' },
            '& li': { marginTop: '0.8em' },
            ...sx,
        },
        title: {
            display: 'block',
            fontSize: '1.5em',
            fontWeight: 'bold',
            marginBottom: '0.5em',
        },
        publishDate: {
            display: 'block',
            color: '#6c757d',
            fontSize: '0.9em',
            marginBottom: '0.5em',
        },
        children: {
            marginTop: '0.5em',
        },
    })

    return (
        <Paper sx={styles.root} {...otherProps}>
            <Box sx={styles.title}>
                {version}
            </Box>

            <Box sx={styles.publishDate}>
                {releaseDate}
            </Box>

            <Divider />

            <Box sx={styles.children}>
                {children}
            </Box>
        </Paper>
    )
}