import { Navigation } from './Layout/Navigation'
import { Router } from './Layout/Router'
import { Footer } from './Layout/Footer'
import { useEffect } from 'react'
import { useCookies } from 'react-cookie'
import { Frontend } from '../common/constants/frontend'
import { useDispatch } from 'react-redux'
import { signIn } from '../redux/slice/UserSlice'
import { useMediaQuery, useTheme } from '@mui/material'
import CookieKey = Frontend.CookieKey

export const bottomNavigationHeight = '56px'

export function App(): JSX.Element {
    const dispatch = useDispatch()
    const [cookies] = useCookies([CookieKey.UserId, CookieKey.Token, CookieKey.Username])

    useEffect(() => {
        const userId = cookies[CookieKey.UserId]
        const token = cookies[CookieKey.Token]
        const username = cookies[CookieKey.Username]
        if (userId !== undefined) {
            dispatch(signIn({ userId, token, username }))
        }
    }, []) // eslint-disable-line react-hooks/exhaustive-deps

    const theme = useTheme()
    const isSmallDevice = useMediaQuery(theme.breakpoints.down('sm'))

    return (
        <>
            <Navigation />

            <>
                <Router />
                {!isSmallDevice && <Footer />}
            </>
        </>
    )
}