import { AppBar, Box, Link, Theme, Toolbar } from '@mui/material'
import { useUser } from '../../state/user'
import React from 'react'
import { MuiStyles } from '../../common/interfaces'
import { Frontend, Url } from '../../common/constant'

export function Navigation(): JSX.Element {
    const user = useUser()
    const styles: MuiStyles<'root' | 'logo' | 'about' | 'user' | 'signIn'> = {
        root: (theme: Theme) => ({
            [theme.breakpoints.down('sm')]: {
                padding: '0 0 !important',
            },
            [theme.breakpoints.up('sm')]: {
                padding: '0 20vw !important',
            },
            height: '4em',
        }),
        logo: {
            color: 'white',
            fontSize: '1.5em',
            fontWeight: 'bold',
            fontStyle: 'italic',
            cursor: 'pointer',
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
    }

    return (
        <AppBar position='sticky' sx={styles.root}>
            <Toolbar>
                <Link sx={styles.logo} href={Url.Home}>Supervisor 2</Link>
                <Box sx={{ flexGrow: 1 }}>
                    <Link
                        href={Frontend.Basename + Url.About}
                        sx={styles.about}
                        children='About'
                    />

                    {user.hasSignedIn() && <Link
                        href={Frontend.Basename + Url.Space}
                        sx={styles.user}
                        children='(User avatar)'
                    />}

                    {!user.hasSignedIn() && <Link
                        href={Frontend.Basename + Url.SignIn}
                        sx={styles.signIn}
                        children='Sign In'
                    />}
                </Box>
            </Toolbar>
        </AppBar>
    )
}