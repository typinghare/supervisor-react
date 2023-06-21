import { useCookies } from 'react-cookie'
import { CookieSetOptions } from 'universal-cookie'

/**
 * Custom hook for managing a cookie.
 * @param name The name of the cookie.
 * @param value The initial value of the cookie (optional).
 * @returns An array containing the cookie value, a function to set the cookie value,
 * and a function to remove the cookie.
 * @example [tokenCookie, setTokenCookie, removeTokenCookie] = useCookie('token')
 */
function useCookie(name: string, value ?: any): [
        string | undefined,
    (value: any, options?: CookieSetOptions) => void,
    (options?: CookieSetOptions) => void
] {
    const [cookies, setCookie, removeCookie] = useCookies([name])

    if (value !== undefined) {
        setCookie(name, value)
    }

    return [
        cookies[name],
        (value, options) => {
            setCookie(name, value, options)
        },
        (options) => {
            removeCookie(name, options)
        },
    ]
}

export default useCookie