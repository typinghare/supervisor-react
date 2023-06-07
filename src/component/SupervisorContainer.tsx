import React from 'react'
import { Box, BoxProps, Theme } from '@mui/material'

export interface SupervisorContentProps extends BoxProps {}

export const SupervisorContainer= function(props:SupervisorContentProps): JSX.Element {
    const { children, sx, ...otherProps } = props

    const style = (theme: Theme) => ({
        margin: '0',
        maxWidth: '100vw',
        minHeight: 'calc(100vh - 4em)',
        [theme.breakpoints.down('sm')]: {
            margin: '2em 1em',
        },
        [theme.breakpoints.up('sm')]: {
            margin: '2em 10%',
        },
        [theme.breakpoints.up('md')]: {
            margin: '2em 20%',
        },
    })


    return <Box sx={style} children={children} {...otherProps} />
}