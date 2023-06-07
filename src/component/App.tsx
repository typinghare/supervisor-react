import React from 'react'
import { CookieKey } from '../common/constant'
import { LocalUser } from '../util/LocalUser'
import { useCookies } from 'react-cookie'
import { NavigationBar } from './NavigationBar'
import { SupervisorRouter } from './SupervisorRouter'
import { Footer } from './Footer'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Box } from '@mui/material'

// Create a client
const queryClient = new QueryClient()

/**
 * @link https://onesignal.com/blog/effective-typescript-for-react-applications/
 *
 * [Navigation]
 * @see NavigationBar
 *
 * [Page]
 * @see AboutPage
 * @see SignInPage
 * @see HomePage
 * @see SpacePage
 *
 * [SupervisorRouter]
 * @see SupervisorRouter
 *
 * [SignIn]
 * @see SignIn
 */
export const App: React.FC = function (): JSX.Element {
    // Initialize local user.
    const [cookies] = useCookies([CookieKey.USER_ID, CookieKey.TOKEN, CookieKey.USERNAME])
    const userId = cookies[CookieKey.USER_ID]
    const token = cookies[CookieKey.TOKEN]
    const username = cookies[CookieKey.USERNAME]
    if (userId && token) LocalUser.INSTANCE().signIn(userId, token, username)

    const mainContainStyle: React.CSSProperties = {}

    return (
        <QueryClientProvider client={queryClient}>
            <NavigationBar />
            <Box sx={mainContainStyle}>
                <SupervisorRouter />
                <Footer />
            </Box>
        </QueryClientProvider>
    )
}
