import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Url } from '../common/constant'
import { useUser } from '../state/user'
import { Page } from './Layout/Page'

/**
 * Home page.
 */
export const HomePage = function(): JSX.Element {
    const navigate = useNavigate()
    const user = useUser()

    React.useEffect((): void => {
        if (user.hasSignedIn()) {
            navigate(Url.Space)
        }
    }, [navigate, user])

    return (
        <Page>
            <h2>Welcome to Supervisor 2.</h2>
        </Page>
    )
}