import React from 'react'
import { Box, BoxProps } from '@mui/material'
import { HourMinuteSecond } from '@typinghare/hour-minute-second'
import { isUndefined } from 'lodash'

export type TimeDisplayProps = BoxProps & {
    // The time to display; undefined will be displayed as "--:--"
    time?: HourMinuteSecond,

    // Whether the colon flashes.
    flash?: boolean,

    // The interval between colon blinks in milliseconds.
    flashInterval?: number
}

export const TimeDisplay: React.FC<TimeDisplayProps> = function(props): JSX.Element {
    const { time, flash, flashInterval, ...boxProps } = props
    const hourString: string = isUndefined(time) ? '--' : time.hour.toString().padStart(2, '0')
    const minuteString: string = isUndefined(time) ? '--' : time.minute.toString().padStart(2, '0')

    const [showColon, setShowColon] = React.useState(true)

    React.useEffect(() => {
        const flashHandle = flash && setInterval(() => setShowColon(!showColon), flashInterval || 1000)

        return (): void => {
            if (flashHandle) clearInterval(flashHandle)
        }
    }, [flash, flashInterval, showColon])

    boxProps.display = 'inline-block'
    return <Box {...boxProps}>
        {hourString + (props.flash && !showColon ? ' ' : ':') + minuteString}
    </Box>
}