import { useCookies } from 'react-cookie'
import { Frontend } from '../common/constants/frontend'

export function useToken(): string | undefined {
    const [cookies] = useCookies([Frontend.CookieKey.Token])

    return cookies[Frontend.CookieKey.Token]
}