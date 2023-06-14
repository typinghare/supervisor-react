import { useEffect, useState } from 'react'
import { Box, BoxProps } from '@mui/material'
import { HourMinuteSecond } from '@typinghare/hour-minute-second'
import { isUndefined } from 'lodash'

export interface TimeDisplayProps extends BoxProps {
    // The time to display; undefined will be displayed as "--:--"
    time?: HourMinuteSecond

    // Whether the colon flashes.
    flash?: boolean

    // The interval between colon blinks in milliseconds.
    flashInterval?: number
}

export function TimeDisplay(props: TimeDisplayProps): JSX.Element {
    const { time, flash, flashInterval, ...otherProps } = props
    const [showColon, setShowColon] = useState(true)

    const hour: string = isUndefined(time) ? '--' : time.hour.toString().padStart(2, '0')
    const minute: string = isUndefined(time) ? '--' : time.minute.toString().padStart(2, '0')

    useEffect(() => {
        const flashHandle = flash && setInterval(() => setShowColon(!showColon), flashInterval || 1000)

        return (): void => {
            if (flashHandle) clearInterval(flashHandle)
        }
    }, [flash, flashInterval, showColon])

    return (
        <Box display='inline-block' {...otherProps}>
            {hour + (props.flash && !showColon ? ' ' : ':') + minute}
        </Box>
    )
}