import { useLocation as reactRouterUseLocation, useNavigate } from 'react-router-dom'

/**
 * Location.
 */
export function useLocation() {
    const navigate = useNavigate()
    const location = reactRouterUseLocation()
    const queryString = location.search
    const pathname = location.pathname
    const currentQueryParams = new URLSearchParams(queryString)

    return {
        pathname,
        queryString,
        queryParams: currentQueryParams,
        setQueryParams: (queryParams: Record<string, string>, cover: boolean = false) => {
            for (const [param, value] of currentQueryParams.entries()) {
                if (!cover) {
                    queryParams[param.toString()] = value
                }
            }

            const queryString = Object.entries(queryParams).map(([name, value]) => `${name}=${value}`).join('&')
            navigate(pathname + '?' + queryString)
        },
    }
}