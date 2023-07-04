import { Box, Card, CardContent, CardProps } from '@mui/material'
import React from 'react'
import { collectStyles } from '../../../common/functions/style'

export interface ChartBoxProps extends CardProps {
    title: string
    height?: string
}

export function ChartBox(props: ChartBoxProps): JSX.Element {
    const { title, height, sx, children, ...otherProps } = props

    const styles = collectStyles({
        root: {
            ...sx,
        },
        title: {
            fontSize: '1.5em',
            marginBottom: '0.5em',
        },
        chartWrapper: {
            height: height || '35vh',
            alignItems: 'center',
        },
    })

    return (
        <Card sx={styles.root} {...otherProps}>
            <CardContent>
                <Box sx={styles.title}>
                    {title}
                </Box>

                <Box sx={styles.chartWrapper}>
                    {children}
                </Box>
            </CardContent>
        </Card>
    )
}