import { Box, BoxProps, LinearProgress } from '@mui/material'
import { TaskStage } from '../../../common/enum/TaskStage'
import { HourMinuteSecond, SlowHourMinuteSecond } from '@typinghare/hour-minute-second'
import { TimeDisplay } from '../TimeDisplay'
import { collectStyles } from '../../../common/functions/style'
import { useEffect, useState } from 'react'

export interface TimeProgressProps extends BoxProps {
    taskStage: TaskStage

    startedAt?: HourMinuteSecond

    endedAt?: HourMinuteSecond

    duration: number

    expectedDuration: number
}

export function TimeProgress(props: TimeProgressProps): JSX.Element {
    const { taskStage, startedAt, endedAt, duration, expectedDuration } = props
    const [dynamicDuration, setDynamicDuration] = useState(duration)
    const [progress, setProgress] = useState(getProgress(dynamicDuration, expectedDuration))

    const styles = collectStyles({
        root: {
            display: 'flex',
            alignItems: 'center',
        },
        startTime: {
            display: 'inline-block',
            textAlign: 'center',
            padding: '0 1em',
        },
        endTime: {
            display: 'inline-block',
            textAlign: 'center',
            padding: '0 1em',
            color: taskStage === TaskStage.ONGOING ? 'green' : 'inherit',
        },
        progress: {
            display: 'inline-block',
            flexGrow: 1,
            height: '0.6em !important',
            borderRadius: '0.5em',
        },
    })

    function EndTimeDisplay(): JSX.Element {
        const time: HourMinuteSecond | undefined = (() => {
            if (taskStage === TaskStage.ONGOING) {
                return SlowHourMinuteSecond.ofMinutes(duration)
            } else if (taskStage === TaskStage.ENDED) {
                return endedAt
            }

            return undefined
        })()

        return (
            <TimeDisplay
                time={time}
                flash={taskStage === TaskStage.ONGOING}
                sx={styles.endTime}
            />
        )
    }

    useEffect(() => {
        const initialTime = new Date().getTime()
        const durationInterval = taskStage === TaskStage.ONGOING ?
            setInterval(() => {
                const newDynamicDuration = dynamicDuration +
                    Math.floor((new Date().getTime() - initialTime) / HourMinuteSecond.MILLISECONDS_IN_MINUTE)
                if (newDynamicDuration !== dynamicDuration) {
                    setDynamicDuration(newDynamicDuration)
                    setProgress(getProgress(newDynamicDuration, expectedDuration))
                }
            }, HourMinuteSecond.MILLISECONDS_IN_SECOND) : null

        return (): void => {
            if (durationInterval) clearInterval(durationInterval)
        }
    }, [dynamicDuration, expectedDuration, taskStage, setDynamicDuration, setProgress])

    return (
        <Box sx={styles.root}>
            <TimeDisplay
                time={startedAt}
                sx={styles.startTime}
            />

            <LinearProgress
                variant='determinate'
                value={progress}
                sx={styles.progress}
            />

            <EndTimeDisplay />
        </Box>
    )
}

/**
 * Returns a progress percentage relative to the given duration and expected duration.
 * @param duration
 * @param expectedDuration
 */
function getProgress(duration: number, expectedDuration: number): number {
    return Math.min(100, Math.floor((duration / expectedDuration) * 100))
}