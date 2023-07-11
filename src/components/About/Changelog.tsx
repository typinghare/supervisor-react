import { Box, Chip, Divider, Paper } from '@mui/material'
import { collectStyles } from '../../common/functions/style'
import moment from 'moment'
import { CSSProperties, ReactNode } from 'react'

export interface ChangelogContent {
    // The new features list.
    newFeatureList?: ReactNode[],

    // The improved feature list.
    improvedFeatureList?: ReactNode[],

    // The fixed items list.
    fixedList?: ReactNode[]
}

export interface ChangelogProps {
    // The version of the changelog.
    version: string

    // The release date of the version (format: "MM/DD/YYYY").
    releaseDate: Date

    content: ChangelogContent
}

/**
 * @link https://coolors.co/palette/ff595e-ffca3a-8ac926-1982c4-6a4c93
 */
export function Changelog(props: ChangelogProps): JSX.Element {
    const { version, releaseDate, content } = props
    const { newFeatureList, improvedFeatureList, fixedList } = content
    const releaseDateString: string = moment(releaseDate).format('MMM Do, YYYY')

    const styles = collectStyles({
        root: {
            marginTop: '1em',
            padding: '1em',
            '& ul': { margin: 0, paddingLeft: '2em' },
            '& li': { marginTop: '0.8em' },
        },
        title: {
            fontSize: '1.5em',
            fontWeight: 'bold',
            marginBottom: '0.25em',
        },
        publishDate: {
            display: 'block',
            color: '#6c757d',
            fontSize: '0.9rem',
            fontWeight: 'normal',
            marginBottom: '0.5em',
        },
        newFeature: {
            marginTop: '0.5em',
        },
        itemContainer: {
            '&>*': {
                marginBottom: '0.5em',
            },
            '& code': {
                fontFamily: 'monospace',
                backgroundColor: '#e9ecef',
                padding: '0.1em 0.25em',
                borderRadius: '0.2em',
            },
        },
        chip: {
            margin: '1em 0',
            padding: '4px 1em',
            height: 'auto',
            borderRadius: '4px',
            fontWeight: 'bold',
            color: 'white',
        },
    })

    return (
        <Paper sx={styles.root}>
            <header style={styles.title as CSSProperties}>
                {version}

                <Box sx={styles.publishDate}>
                    {releaseDateString}
                </Box>
            </header>

            <Divider />

            {newFeatureList && newFeatureList.length >= 1 && (
                <Box sx={styles.itemContainer}>
                    <Chip
                        label='NEW'
                        sx={{ ...styles.chip, backgroundColor: '#8AC926' }}
                    />
                    {newFeatureList.map((newFeature, index) => (
                        <Box key={index}>
                            {newFeature}
                        </Box>
                    ))}
                </Box>
            )}

            {improvedFeatureList && improvedFeatureList.length >= 1 && (
                <Box sx={styles.itemContainer}>
                    <Chip
                        label='IMPROVED'
                        sx={{ ...styles.chip, backgroundColor: '#1982C4' }}
                    />
                    {improvedFeatureList.map((improvedFeature, index) => (
                        <Box key={index}>
                            {improvedFeature}
                        </Box>
                    ))}
                </Box>
            )}

            {fixedList && fixedList.length >= 1 && (
                <Box sx={styles.itemContainer}>
                    <Chip
                        label='FIXED'
                        sx={{ ...styles.chip, backgroundColor: '#FF595E' }}
                    />

                    {fixedList.map((fixed, index) => (
                        <Box key={index}>
                            {fixed}
                        </Box>
                    ))}
                </Box>
            )}
        </Paper>
    )
}
