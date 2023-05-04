import React from 'react'
import { Box, Container, SxProps } from '@mui/material'

export const Footer: React.FC = () => {
    const containerSx: SxProps = {
        bottom: 0,
        width: '100% !important',
        height: '100px',
        backgroundColor: '#bde0fe',
        paddingTop: '1em',
    }
    const supervisorSx: SxProps = {
        display: 'inline-block',
        fontSize: '1.5em',
        fontWeight: 'bold',
        fontStyle: 'italic',
        marginRight: '0.75em',
    }
    const copyrightSx: SxProps = {
        display: 'inline-block',
    }

    return <Box sx={containerSx}>
        <Container>
            <Box sx={supervisorSx}>Supervisor</Box>
            <Box sx={copyrightSx}>© 2022-2023 Supervisor, Ind.</Box>
        </Container>
    </Box>
}