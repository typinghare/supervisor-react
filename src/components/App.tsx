import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Navigation } from './Layout/Navigation'
import { Router } from './Layout/Router'
import { Footer } from './Layout/Footer'
import { useEffect } from 'react'
import { useCookies } from 'react-cookie'
import { Frontend } from '../common/constants/frontend'
import { useDispatch } from 'react-redux'
import { signIn } from '../redux/slice/UserSlice'
import CookieKey = Frontend.CookieKey

export function App(): JSX.Element {
    const dispatch = useDispatch()
    const [cookies] = useCookies([CookieKey.UserId, CookieKey.Token, CookieKey.Username])

    useEffect(() => {
        const userId = cookies[CookieKey.UserId]
        const token = cookies[CookieKey.Token]
        const username = cookies[CookieKey.Username]
        dispatch(signIn({ userId, token, username }))
    })

    return (
        <QueryClientProvider client={new QueryClient()}>
            <Navigation />

            <>
                <Router />
                <Footer />
            </>
        </QueryClientProvider>
    )
}