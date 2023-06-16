import { AppBar, Box, Link, Toolbar } from '@mui/material'
import { Frontend } from '../../common/constants/frontend'
import { collectStyles } from '../../common/functions/style'
import { useAppSelector } from '../../redux/hooks'
import { selectUserId } from '../../redux/slice/UserSlice'

export const navigationHeight = '4em'

export function Navigation(): JSX.Element {
    const userId = useAppSelector(selectUserId)

    const styles = collectStyles({
        root: {
            padding: {
                xs: '0 0',
                sm: '0 5%',
                md: '0 10%',
                lg: '0 15%',
                xl: '0 20%',
            },
            height: navigationHeight,
        },
        logo: {
            color: 'white',
            fontSize: '1.5em',
            fontWeight: 'bold',
            fontStyle: 'italic',
            cursor: 'pointer',
            '&:hover': {
                textDecoration: 'none',
            },
        },
        about: {
            color: 'white',
            margin: '0 1em',
        },
        user: {
            color: 'white',
            float: 'right',
        },
        signIn: {
            color: 'white',
            float: 'right',
        },
    })

    return (
        <AppBar position='sticky' sx={styles.root}>
            <Toolbar>
                <Link sx={styles.logo} href={Frontend.Basename + Frontend.Url.Home}>Supervisor 2</Link>
                <Box sx={{ flexGrow: 1 }}>
                    <Link
                        href={Frontend.Basename + Frontend.Url.About}
                        sx={styles.about}
                        children='About'
                    />

                    {userId !== undefined && <Link
                        href={Frontend.Basename + Frontend.Url.Space}
                        sx={styles.user}
                        children='(User avatar)'
                    />}

                    {userId === undefined && <Link
                        href={Frontend.Basename + Frontend.Url.SignIn}
                        sx={styles.signIn}
                        children='Sign In'
                    />}
                </Box>
            </Toolbar>
        </AppBar>
    )
}