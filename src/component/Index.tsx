import React, { FunctionComponent } from 'react'
import { LocalUser } from '../util/LocalUser'
import { Box } from '@mui/material'
import { History } from '../util/History'

/**
 * Index page.
 */
export const Index: FunctionComponent = () => {
    if (LocalUser.INSTANCE().isSignedIn) {
        const userId = LocalUser.INSTANCE().userId
        History.INSTANCE().pushAndReload(`/supervisor/space/${userId}`)
    }

    return <Box>
        <h2>Welcome to Supervisor 2.</h2>
    </Box>
}