import { Box, BoxProps, LinearProgress } from '@mui/material'
import { TaskStage } from '../../common/enum/TaskStage'
import { HourMinuteSecond, SlowHourMinuteSecond } from '@typinghare/hour-minute-second'
import { TimeDisplay } from '../Common/TimeDisplay'
import { collectStyles } from '../../common/functions/style'
import { useEffect, useState } from 'react'

export interface TimeProgressProps extends BoxProps {
    taskStage: TaskStage
    startedAt?: HourMinuteSecond
    endedAt?: HourMinuteSecond
    duration: number
    expectedDuration: number
}

export function TimeProgress(props: TimeProgressProps): JSX.Element {
    const { taskStage, startedAt, endedAt, duration, expectedDuration, sx, ...otherProps } = props
    const [dynamicDuration, setDynamicDuration] = useState(duration)
    const [progress, setProgress] = useState(getProgress(dynamicDuration, expectedDuration))

    const endTimeColor: string = (() => {
        if (taskStage === TaskStage.ONGOING) {
            return 'green'
        } else if (taskStage === TaskStage.PAUSED) {
            return 'coral'
        } else {
            return 'inherit'
        }
    })()

    const styles = collectStyles({
        root: {
            display: 'flex',
            alignItems: 'center',
            ...sx,
        },
        startTime: {
            display: 'inline-block',
            textAlign: 'center',
            padding: '0 0.5em',
        },
        endTime: {
            display: 'inline-block',
            textAlign: 'center',
            padding: '0 0.5em',
            color: endTimeColor,
        },
        progress: {
            display: 'inline-block',
            flexGrow: 1,
            height: '0.6em !important',
            borderRadius: '0.5em',
        },
    })

    const endTime: HourMinuteSecond | undefined = (() => {
        if (taskStage === TaskStage.ONGOING || taskStage === TaskStage.PAUSED) {
            return SlowHourMinuteSecond.ofSeconds(dynamicDuration)
        } else if (taskStage === TaskStage.ENDED) {
            return endedAt
        }

        return undefined
    })()

    useEffect(() => {
        const initialTime = new Date().getTime()
        const durationInterval = taskStage === TaskStage.ONGOING ?
            setInterval(() => {
                const newDynamicDuration = dynamicDuration +
                    Math.floor((new Date().getTime() - initialTime) / HourMinuteSecond.MILLISECONDS_IN_SECOND)
                if (newDynamicDuration !== dynamicDuration) {
                    setDynamicDuration(newDynamicDuration)
                    setProgress(getProgress(newDynamicDuration, expectedDuration))
                }
            }, HourMinuteSecond.MILLISECONDS_IN_SECOND) : null

        return (): void => {
            if (durationInterval) clearInterval(durationInterval)
        }
    }, [taskStage, setDynamicDuration, setProgress]) // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <Box sx={styles.root} {...otherProps}>
            <TimeDisplay
                time={startedAt}
                sx={styles.startTime}
            />

            <LinearProgress
                variant='determinate'
                value={progress}
                sx={styles.progress}
            />

            <TimeDisplay
                time={endTime}
                flash={taskStage === TaskStage.ONGOING}
                sx={styles.endTime}
            />
        </Box>
    )
}

/**
 * Returns a progress percentage relative to the given duration and expected duration.
 * @param duration The duration in seconds
 * @param expectedDuration The expected duration in seconds
 */
function getProgress(duration: number, expectedDuration: number): number {
    return Math.min(100, Math.floor((duration / expectedDuration) * 100))
}