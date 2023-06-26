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
        tabs: {
            height: '56px',
        },
        tab: {
            paddingTop: 0,
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
                sx={styles.tabs}
            >
                {range(size).map(key => (
                    children[key] !== undefined && <Tab
                        key={key}
                        value={valueList[key]}
                        label={labelList[key]}
                        iconPosition='start'
                        sx={styles.tab}
                        icon={Array.isArray(children) ? children[key] : undefined}
                    />
                ))}
            </Tabs>
        </Box>
    )
}