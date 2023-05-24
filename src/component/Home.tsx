import React, { FunctionComponent } from 'react'
import { Box } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { LocalUser } from '../util/LocalUser'

/**
 * Index page.
 */
export const Home: FunctionComponent = () => {
    const navigate = useNavigate()
    if (LocalUser.INSTANCE().isSignedIn) {
        navigate('/space/1')
    }

    return <Box>
        <h2>Welcome to Supervisor 2.</h2>
    </Box>
}