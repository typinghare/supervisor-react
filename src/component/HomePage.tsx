import React from 'react'
import { useNavigate } from 'react-router-dom'
import { LocalUser } from '../util/LocalUser'
import { SupervisorContainer } from './SupervisorContainer'
import { RedirectUrl } from '../common/constant'

/**
 * Index page.
 */
export const HomePage: React.FC = () => {
    const navigate = useNavigate()
    React.useEffect((): void => {
        // If the user has signed in, redirect to the space page.
        if (LocalUser.INSTANCE().isSignedIn) {
            navigate(RedirectUrl.SPACE)
        }
    }, [navigate])

    return <SupervisorContainer>
        <h2>Welcome to Supervisor 2.</h2>
    </SupervisorContainer>
}