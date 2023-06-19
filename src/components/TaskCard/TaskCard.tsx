import { Divider, Paper } from '@mui/material'
import { TaskCardHeader } from './TaskCardHeader'
import { TaskStage } from '../../common/enum/TaskStage'
import { collectStyles } from '../../common/functions/style'
import { TimeProgress } from './TimeProgress'
import { TaskComment } from './TaskComment'
import { HourMinuteSecond } from '@typinghare/hour-minute-second'

export interface Task {
    id: number

    taskStage: TaskStage,
    duration: number,
    subjectName: string,
    categoryName: string

    startedAt?: HourMinuteSecond,
    endedAt?: HourMinuteSecond,
    expectedDuration: number

    createdAt?: Date
    resumedAt?: Date

    commentArray: string[]
}

export interface TaskCardProps extends Task {
}

export function TaskCard(props: TaskCardProps): JSX.Element {
    const {
        taskStage, duration, subjectName, categoryName,
        startedAt, endedAt, expectedDuration,
        commentArray,
    } = props

    const styles = collectStyles({
        root: {
            paddingBottom: '0.5em',
        },
        taskCardHeader: {
            padding: '0.5em 1em',
        },
        timeProgress: {
            margin: '1em 0.25em',
        },
        taskComment: {
            margin: '0 1em',
            color: '#999999',
        },
    })

    return (
        <Paper sx={styles.root}>
            <TaskCardHeader
                taskStage={taskStage}
                duration={duration}
                subjectName={subjectName}
                categoryName={categoryName}
                sx={styles.taskCardHeader}
            />

            <Divider />

            <TimeProgress
                taskStage={taskStage}
                startedAt={startedAt}
                endedAt={endedAt}
                duration={duration}
                expectedDuration={expectedDuration}
                sx={styles.timeProgress}
            />

            <TaskComment
                content={commentArray[0]}
                sx={styles.taskComment}
            />
        </Paper>
    )
}