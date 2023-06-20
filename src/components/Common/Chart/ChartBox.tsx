import { Box, BoxProps } from '@mui/material'
import React from 'react'
import { collectStyles } from '../../../common/functions/style'

export interface ChartBoxProps extends BoxProps {
}

export function ChartBox(props: ChartBoxProps): JSX.Element {
    const { sx, children, ...otherProps } = props

    const styles = collectStyles({
        root: {
            height: '30vh',
            ...sx,
        },
    })

    return (
        <Box sx={styles.root} {...otherProps}>
            {children}
        </Box>
    )
}