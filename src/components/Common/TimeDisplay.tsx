import { Box, BoxProps } from '@mui/material'
import { HourMinuteSecond } from '@typinghare/hour-minute-second'
import { isUndefined } from 'lodash'
import { useEffect, useState } from 'react'
import { collectStyles } from '../../common/functions/style'


const DEFAULT_FLASH_INTERVAL = 1000

export interface TimeDisplayProps extends BoxProps {
    // The time to display; undefined will be displayed as "--:--"
    time?: HourMinuteSecond

    // Whether the colon flashes.
    flash?: boolean

    // The interval between colon blinks in milliseconds.
    flashInterval?: number
}

export function TimeDisplay(props: TimeDisplayProps): JSX.Element {
    const { time, flash, flashInterval, sx, ...otherProps } = props
    const [showColon, setShowColon] = useState(true)

    const hour: string = isUndefined(time) ? '--' : time.hour.toString().padStart(2, '0')
    const minute: string = isUndefined(time) ? '--' : time.minute.toString().padStart(2, '0')

    useEffect(() => {
        const flashHandle = flash && setInterval(() => setShowColon(!showColon), flashInterval || DEFAULT_FLASH_INTERVAL)

        return () => {
            if (flashHandle) clearInterval(flashHandle)
        }
    }, [flash, flashInterval, showColon])

    const styles = collectStyles({
        root: {
            display: 'inline-block',
            fontFamily: 'Digital-7',
            fontSize: '1.25em',
            ...sx,
        },
    })

    return (
        <Box sx={styles.root} {...otherProps}>
            {hour + (props.flash && !showColon ? ' ' : ':') + minute}
        </Box>
    )
}