import React from 'react'
import { AppBar, Box, Link, SxProps, Toolbar, useMediaQuery, useTheme } from '@mui/material'
import { LocalUser } from '../util/LocalUser'
import { BASE_URL, RedirectUrl } from '../common/constant'

/**
 * Navigation bar.
 * @constructor
 */
export const NavigationBar: React.FC = function(): JSX.Element {
    const appBarSx: SxProps = {
        padding: '0 20vw !important',
        height: '4em',
    }
    const supervisorSx: SxProps = {
        color: 'white',
        fontSize: '1.5em',
        fontWeight: 'bold',
        fontStyle: 'italic',
        cursor: 'pointer',
    }

    const theme = useTheme()
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'))
    if (isSmallScreen) {
        appBarSx.padding = '0 0 !important'
    }

    return <AppBar position='sticky' sx={appBarSx}>
        <Toolbar>
            <Link sx={supervisorSx} href={RedirectUrl.HOME}>Supervisor 2</Link>
            <Box sx={{ flexGrow: 1 }}>
                <About />
                {(LocalUser.INSTANCE().isSignedIn && <UserBlock />) || <SignInLink />}
            </Box>
        </Toolbar>
    </AppBar>
}

const About: React.FC = function(): JSX.Element {
    const aboutSx: SxProps = {
        color: 'white',
        margin: '0 1em',
    }

    return <Link href={BASE_URL + RedirectUrl.ABOUT} sx={aboutSx} children='About' />
}

const UserBlock: React.FC = function(): JSX.Element {
    const userBlockSx: SxProps = {
        color: 'white',
        float: 'right',
    }

    return <Link href={BASE_URL + RedirectUrl.SPACE} sx={userBlockSx} />
}

const SignInLink: React.FC = function(): JSX.Element {
    const signInLinkSx: SxProps = {
        color: 'white',
        float: 'right',
    }

    return <Link href={BASE_URL + RedirectUrl.SIGN_IN} sx={signInLinkSx} children='Sign In' />
}