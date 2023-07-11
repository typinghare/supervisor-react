import { AppBar, Box, Link, Toolbar } from '@mui/material'
import { Frontend } from '../../common/constants/frontend'
import { collectStyles } from '../../common/functions/style'
import { useAppSelector } from '../../redux/hooks'
import { selectUserId } from '../../redux/slice/UserSlice'
import { UserMenu } from '../User/UserMenu'

export const navigationHeight = '64px'

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
            display: 'flex',
            justifyItems: 'center',
        },
        toolbar: {
            minHeight: navigationHeight,
        },
        logo: {
            color: 'white',
            fontSize: {
                xs: '1.25em',
                sm: '1.5em',
            },
            fontWeight: 'bold',
            fontStyle: 'italic',
            cursor: 'pointer',
            textDecoration: 'none',
            '&:hover': {
                textDecoration: 'none',
            },
        },
        linkContainer: {
            flexGrow: 1,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
        },
        rightSideLinkContainer: {
            marginLeft: 'auto',
            display: 'flex',
            alignItems: 'center',
        },
        about: {
            color: 'white',
            margin: '0 1em',
            textDecoration: 'none',
            '&:hover': {
                textDecoration: 'underline',
                textDecorationColor: 'white',
            },
        },
        space: {
            color: 'white',
            textDecoration: 'none',
            marginRight: '1em',
            '&:hover': {
                textDecoration: 'underline',
                textDecorationColor: 'white',
            },
        },
        userAvatar: {
            display: 'inline-block',
            textDecoration: 'none',
            width: '32px',
            '& .': {
                color: 'white',
            },
        },
        signIn: {
            color: 'white',
            textDecoration: 'none',
        },
    })

    return (
        <AppBar position='relative' sx={styles.root}>
            <Toolbar sx={styles.toolbar}>
                <Link sx={styles.logo} href={Frontend.Basename + Frontend.Url.Home}>Supervisor 2</Link>
                <Box sx={styles.linkContainer}>
                    <Link
                        href={Frontend.Basename + Frontend.Url.About}
                        sx={styles.about}
                    >
                        About
                    </Link>

                    <Box sx={styles.rightSideLinkContainer}>
                        <Link
                            href={Frontend.Basename + Frontend.Url.Space}
                            sx={styles.space}
                        >
                            Space
                        </Link>

                        {userId !== undefined && (
                            <Box sx={styles.userAvatar}>
                                <UserMenu />
                            </Box>
                        )}

                        {userId === undefined && (
                            <Link
                                href={Frontend.Basename + Frontend.Url.SignIn}
                                sx={styles.signIn}
                                children='Sign In'
                            />
                        )}
                    </Box>
                </Box>
            </Toolbar>
        </AppBar>
    )
}