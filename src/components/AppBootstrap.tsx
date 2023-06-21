import { useDispatch } from 'react-redux'
import useCookie from '../hook/useCookie'
import { useEffect } from 'react'
import { compact } from 'lodash'
import { signIn } from '../redux/slice/UserSlice'
import { Frontend } from '../common/constants/frontend'
import CookieKey = Frontend.CookieKey

/**
 * This component includes all events when the application starts.
 */
export function AppBootstrap(): JSX.Element {
    const dispatch = useDispatch()
    const [userIdCookie] = useCookie(CookieKey.UserId)
    const [tokenCookie] = useCookie(CookieKey.Token)
    const [usernameCookie] = useCookie(CookieKey.Username)

    useEffect(() => {
        if (compact([userIdCookie, tokenCookie, usernameCookie]).length === 3) {
            dispatch(signIn({
                userId: parseInt(userIdCookie!),
                token: tokenCookie,
                username: usernameCookie,
            }))
        }
    }, []) // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <></>
    )
}