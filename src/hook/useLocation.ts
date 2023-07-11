import { useLocation as reactRouterUseLocation, useNavigate } from 'react-router-dom'

/**
 * Location.
 */
export function useLocation(): {
    pathname: string,
    queryString: string,
    queryParams: URLSearchParams,
    setQueryParams: (queryParams: Record<string, string>, cover?: boolean) => void
} {
    const navigate = useNavigate()
    const location = reactRouterUseLocation()
    const queryString = location.search
    const pathname = location.pathname
    const currentQueryParams = new URLSearchParams(queryString)

    return {
        pathname,
        queryString,
        queryParams: currentQueryParams,

        /**
         * Set query params.
         * @param queryParams The query parameters to set.
         * @param cover Whether to cover the old query parameters.
         */
        setQueryParams: (queryParams: Record<string, string>, cover: boolean = true) => {
            // Copy current query parameters
            const params: Record<string, string> = {}
            for (const [name, value] of currentQueryParams.entries()) {
                params[name.toString()] = value
            }

            for (const [name, value] of Object.entries(queryParams)) {
                if (!params.hasOwnProperty(name) || cover) {
                    params[name] = value
                }
            }

            const queryString = Object.entries(queryParams)
                .map(([name, value]) => `${name}=${value}`)
                .join('&')

            navigate(pathname + '?' + queryString)
        },
    }
}