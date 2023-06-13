// noinspection JSUnusedAssignment

import { Box, BoxProps, LinearProgress, SxProps } from '@mui/material'
import React from 'react'
import { TimeDisplay } from '../Common/TimeDisplay'
import { HourMinuteSecond, SlowHourMinuteSecond } from '@typinghare/hour-minute-second'
import { TaskStage } from '../../common/constant'

export type TaskProgressProps = BoxProps & {
    taskStage?: TaskStage,
    startedAt?: HourMinuteSecond
    endedAt?: HourMinuteSecond
    duration: number;
    expectedDuration: number;
}

function getProgress(duration: number, expectedDuration: number): number {
    return Math.min(100, Math.floor((duration / expectedDuration) * 100))
}

const timeDisplayStyle = {
    display: 'inline-block',
    width: '4em',
    textAlign: 'center',
    fontFamily: '\'Courier New\', sans-serif',
}

export const TaskProgress: React.FC<TaskProgressProps> = function(props): JSX.Element {
    const { taskStage, startedAt, endedAt, duration, expectedDuration, ...boxProps } = props
    const [dynamicDuration, setDynamicDuration] = React.useState(duration)
    const [progress, setProgress] = React.useState(getProgress(duration, expectedDuration))

    const StartTimeDisplay = function(): JSX.Element {
        return <TimeDisplay time={startedAt} sx={timeDisplayStyle} />
    }

    const EndTimeDisplay = function(): JSX.Element {
        let time: HourMinuteSecond | undefined = undefined
        if (taskStage === TaskStage.ONGOING) {
            time = SlowHourMinuteSecond.ofMinutes(duration)
        } else if (taskStage === TaskStage.ENDED) {
            time = endedAt
        }

        const style: SxProps = {
            ...timeDisplayStyle,
            color: taskStage === TaskStage.ONGOING ? 'green' : 'inherit',
        }

        return <TimeDisplay time={time} flash={taskStage === TaskStage.ONGOING} sx={style} />
    }

    function LinearProgressBar(): JSX.Element {
        const style: SxProps = {
            display: 'inline-block !important',
            width: 'calc(100% - 8em)',
            height: '0.6em !important',
            borderRadius: '0.5em',
        }

        return <LinearProgress variant='determinate' value={progress} sx={style} />
    }

    React.useEffect(() => {
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

    return <Box sx={boxProps}>
        <StartTimeDisplay />
        <LinearProgressBar />
        <EndTimeDisplay />
    </Box>
}