import { Box, Container } from '@mui/material'
import { collectStyles } from '../../common/functions/style'

export function Footer(): JSX.Element {
    const styles = collectStyles({
        root: {
            bottom: 0,
            width: '100% !important',
            height: '100px',
            backgroundColor: '#bde0fe',
            paddingTop: '1em',
        },
        logo: {
            display: 'inline-block',
            fontSize: '1.5em',
            fontWeight: 'bold',
            fontStyle: 'italic',
            marginRight: '0.75em',
        },
        copyright: {
            display: 'inline-block',
        },
    })

    return (
        <Box sx={styles.root}>
            <Container>
                <Box sx={styles.logo}>Supervisor</Box>
                <Box sx={styles.copyright}>© 2022-2023 Supervisor. (Hey I don't know what it this but whatever)</Box>
            </Container>
        </Box>
    )
}