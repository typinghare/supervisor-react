import { Box, BoxProps, LinearProgress } from '@mui/material'
import { TimeDisplay } from '../Common/TimeDisplay'
import { HourMinuteSecond, SlowHourMinuteSecond } from '@typinghare/hour-minute-second'
import { TaskStage } from '../../common/constant'
import { useEffect, useState } from 'react'
import { MuiStyles } from '../../common/interfaces'

export interface TaskProgressProps extends BoxProps {
    taskStage?: TaskStage,
    startedAt?: HourMinuteSecond
    endedAt?: HourMinuteSecond
    duration: number;
    expectedDuration: number;
}

/**
 * Returns a progress percentage relative to the given duration and expected duration.
 * @param duration
 * @param expectedDuration
 */
function getProgress(duration: number, expectedDuration: number): number {
    return Math.min(100, Math.floor((duration / expectedDuration) * 100))
}

export function TaskProgress(props: TaskProgressProps): JSX.Element {
    const { taskStage, startedAt, endedAt, duration, expectedDuration, ...otherProps } = props
    const [dynamicDuration, setDynamicDuration] = useState(duration)
    const [progress, setProgress] = useState(getProgress(dynamicDuration, expectedDuration))

    const styles: MuiStyles<'startTime' | 'endTime' | 'progressBar'> = {
        startTime: {
            display: 'inline-block',
            width: '4em',
            textAlign: 'center',
            fontFamily: 'Digital-7',
        },
        endTime: {
            display: 'inline-block',
            width: '4em',
            textAlign: 'center',
            fontFamily: 'Digital-7',
            color: taskStage === TaskStage.ONGOING ? 'green' : 'inherit',
        },
        progressBar: {
            display: 'inline-block !important',
            width: 'calc(100% - 8em)',
            height: '0.6em !important',
            borderRadius: '0.5em',
        },
    }

    const EndTimeDisplay = function(): JSX.Element {
        let time: HourMinuteSecond | undefined = undefined
        if (taskStage === TaskStage.ONGOING) {
            time = SlowHourMinuteSecond.ofMinutes(duration)
        } else if (taskStage === TaskStage.ENDED) {
            time = endedAt
        }

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
            setInterval((): void => {
                const newDynamicDuration
                    = Math.floor((new Date().getTime() - initialTime) / HourMinuteSecond.MILLISECONDS_IN_MINUTE)
                if (newDynamicDuration !== dynamicDuration) {
                    setDynamicDuration(newDynamicDuration)
                    setProgress(getProgress(newDynamicDuration, expectedDuration))
                }
            }, HourMinuteSecond.MILLISECONDS_IN_SECOND) : null

        return (): void => {
            if (durationInterval) clearInterval(durationInterval)
        }
    }, [taskStage, expectedDuration, dynamicDuration])

    return (
        <Box {...otherProps}>
            <TimeDisplay
                time={startedAt}
                sx={styles.startTime}
            />

            <LinearProgress
                variant='determinate'
                value={progress}
                sx={styles.progressBar}
            />

            <EndTimeDisplay />
        </Box>
    )
}