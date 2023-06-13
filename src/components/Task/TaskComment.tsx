import React from 'react'
import { Box, BoxProps, SxProps, Typography } from '@mui/material'

export type TaskCommentProps = BoxProps & {
    content: string
}

export const TaskComment: React.FC<TaskCommentProps> = function(props): JSX.Element {
    const { content, ...boxProps } = props
    const typographyStyle: SxProps = {
        color: '#999',
        marginLeft: '0.5em',
    }

    return <Box {...boxProps}>
        <Typography variant='body2' sx={typographyStyle}>
            {content}
        </Typography>
    </Box>
}