import React, { FunctionComponent } from 'react'
import { AppBar, Box, Link, SxProps, Toolbar, Typography } from '@mui/material'
import { LocalUser } from '../util/LocalUser'
import { RedirectUrl } from '../common/constant'

export const Navigation: FunctionComponent = () => {
    const appBarSx: SxProps = { padding: '0 !important' }
    const supervisorSx: SxProps = {
        fontSize: '1.25em',
        fontWeight: 'bold',
        fontStyle: 'italic',
        cursor: 'pointer',
    }
    const linkBoxSx: SxProps = { flexGrow: 1 }

    return <AppBar position='sticky' sx={appBarSx}>
        <Toolbar>
            <Typography sx={supervisorSx}>Supervisor 2</Typography>

            <Box sx={linkBoxSx}>
                <About />
                {(LocalUser.INSTANCE().isSignedIn && <UserBlock />) || <SignInLink />}
            </Box>
        </Toolbar>
    </AppBar>
}

const About: FunctionComponent = () => {
    const aboutSx: SxProps = {
        color: 'white',
        display: 'inline-block',
        margin: '0 1em',
    }

    return <Link href={RedirectUrl.ABOUT} sx={aboutSx}>ABOUT</Link>
}

const UserBlock: FunctionComponent = () => {
    const userBlockSx: SxProps = {
        color: 'white',
        display: 'inline-block',
        float: 'right',
    }

    return <Link href={RedirectUrl.USER} sx={userBlockSx}></Link>
}

const SignInLink: FunctionComponent = () => {
    const signInLinkSx: SxProps = {
        color: 'white',
        display: 'inline-block',
        float: 'right',
    }

    return <Link href={RedirectUrl.SIGN_IN} sx={signInLinkSx}>Sign In</Link>
}