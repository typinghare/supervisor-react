import { Box, BoxProps, Tab, Tabs } from '@mui/material'
import { range } from 'lodash'
import React, { SyntheticEvent } from 'react'
import { collectStyles } from '../../../common/functions/style'

export interface TabListProps extends BoxProps {
    value: string
    valueList: string[]
    labelList: string[]
    onValueChange: (value: string) => void
    children: (React.ReactElement | undefined)[]
}

export function TabList(props: TabListProps): JSX.Element {
    const { value, valueList, labelList, onValueChange, children, ...otherProps } = props

    const size = children.length

    function handleTabChange(event: SyntheticEvent, value: string) {
        onValueChange(value)
    }

    const styles = collectStyles({
        icon: {
            '& svg': {
                fontSize: '1.25em',
            },
        },
    })

    return (
        <Box {...otherProps}>
            <Tabs
                value={value}
                variant='scrollable'
                scrollButtons
                onChange={handleTabChange}
            >
                {range(size).map(key => (
                    children[key] !== undefined && <Tab
                        key={key}
                        value={valueList[key]}
                        label={labelList[key]}
                        iconPosition='start'
                        sx={styles.icon}
                        icon={Array.isArray(children) ? children[key] : undefined}
                    />
                ))}
            </Tabs>
        </Box>
    )
}