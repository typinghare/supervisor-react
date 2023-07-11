import { Box, Container, Divider, Grid } from '@mui/material'
import { collectStyles } from '../../common/functions/style'
import { CSSProperties } from 'react'
import MailOutlineIcon from '@mui/icons-material/MailOutline'

export function Footer(): JSX.Element {
    const styles = collectStyles({
        root: {
            bottom: 0,
            width: '100% !important',
            height: '100px',
            backgroundColor: '#a8dcd1',
            paddingTop: '1em',
            paddingBottom: '1em',
        },
        title: {
            fontWeight: 'bold',
            fontSize: '1.2em',
            marginBottom: '0.5em',
        },
        mailIcon: {
            fontSize: '1em',
            marginRight: '0.5em',
            transform: 'translateY(2px)',
        },
        mail: {
            display: 'flex',
            '&>a': {
                color: 'black',
                textDecoration: 'none',
            },
            '&>a:hover': {
                textDecoration: 'underline',
            },
        },
        logo: {
            display: 'inline-block',
            fontSize: '1.5em',
            fontWeight: 'bold',
            fontStyle: 'italic',
            marginRight: '0.75em',
        },
        copyright: {
            width: '100%',
            marginTop: '0.5rem',
            textAlign: 'center',
            display: 'inline-block',
        },
    })

    return (
        <footer style={styles.root as CSSProperties}>
            <Container>
                <Grid container sx={{ marginBottom: '1.5rem' }}>
                    <Grid item xl={3}>
                        <Box sx={styles.logo}>Supervisor</Box>
                    </Grid>
                    <Grid item xl={3}>
                        <Box sx={styles.title}>Contact</Box>
                        <Box sx={styles.mail}>
                            <MailOutlineIcon sx={styles.mailIcon} />
                            <a href='mailto:jameschan312.cn@gmail.com'>jameschan312.cn@gmail.com</a>
                        </Box>
                    </Grid>
                    <Grid item xl={3}></Grid>
                    <Grid item xl={3}></Grid>
                </Grid>

                <Divider />

                <Box sx={styles.copyright}>
                    <span>Copyright &copy; 2022-2023 Supervisor.</span>
                </Box>
            </Container>
        </footer>
    )
}