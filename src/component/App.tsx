import React, { FunctionComponent } from 'react'
import { Box } from '@mui/material'
import { CookieKey } from '../common/constant'
import { LocalUser } from '../util/LocalUser'
import { useCookies } from 'react-cookie'
import { Navigation } from './Navigation'
import { SupervisorRouter } from './SupervisorRouter'
import { Footer } from './Footer'

export const App: FunctionComponent = function() {
    // Initialize local user.
    const [cookies] = useCookies([CookieKey.USER_ID, CookieKey.TOKEN, CookieKey.USERNAME])
    const userId = cookies[CookieKey.USER_ID]
    const token = cookies[CookieKey.TOKEN]
    const username = cookies[CookieKey.USERNAME]
    if (userId && token) LocalUser.INSTANCE().signIn(userId, token, username)

    return <Box>
        <Navigation />
        <SupervisorRouter />
        <Footer />
    </Box>
}