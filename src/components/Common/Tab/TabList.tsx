import { Box, BoxProps, Tab, Tabs } from '@mui/material'
import { range } from 'lodash'
import { SyntheticEvent } from 'react'

export interface TabListProps extends BoxProps {
    value: string
    valueList: string[]
    labelList: string[]
    onValueChange: (value: string) => void
}

export function TabList(props: TabListProps): JSX.Element {
    const { value, valueList, labelList, onValueChange, children, ...otherProps } = props
    const size = valueList.length

    function handleTabChange(event: SyntheticEvent, value: string) {
        onValueChange(value)
    }

    return (
        <Box {...otherProps}>
            <Tabs
                value={value}
                variant='scrollable'
                scrollButtons
                onChange={handleTabChange}
            >
                {range(size).map(key => (
                    <Tab
                        key={key}
                        value={valueList[key]}
                        label={labelList[key]}
                        iconPosition='start'
                        icon={Array.isArray(children) && children[key]}
                    />
                ))}
            </Tabs>
        </Box>
    )
}