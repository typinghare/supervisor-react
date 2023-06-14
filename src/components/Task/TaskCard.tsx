import React from 'react'
import { Box, Card, CardContent, CardProps, Collapse } from '@mui/material'
import { TaskStage } from '../../common/constant'
import { TaskProgress } from './TaskProgress'
import { convertDateToTime } from '../../common/date'
import { TaskComment } from './TaskComment'
import { TaskCardTitle } from './TaskCardTitle'

export type Task = {
    taskId: number,
    taskStage: TaskStage,
    subjectName: string,
    categoryName: string,
    createdAt: Date,
    startedAt?: Date,
    endedAt?: Date,
    resumedAt?: Date,
    duration: number,
    expectedDuration: number,
}

export type TaskCardProps = CardProps & Task

export function TaskCard(props: TaskCardProps): JSX.Element {
    const {
        taskId,
        taskStage,
        subjectName,
        categoryName,
        createdAt,
        startedAt,
        endedAt,
        resumedAt,
        duration,
        expectedDuration,
        ...cardProps
    } = props

    const [expanded, setExpanded] = React.useState<boolean>(false)

    function TaskCardExpansion(): JSX.Element {
        return <Box></Box>
    }

    return (
        <Card variant='elevation' elevation={3} {...cardProps}>
            <CardContent>
                <TaskCardTitle
                    {...{
                        taskStage,
                        duration,
                        subjectName,
                        categoryName,
                    }}
                />

                <TaskProgress
                    sx={{ marginBottom: '0.5em' }}
                    {...{
                        taskStage, duration, expectedDuration,
                        startedAt: convertDateToTime(startedAt),
                        endedAt: convertDateToTime(endedAt),
                    }}
                />

                <TaskComment content='This is a comment.' />

                <Collapse in={expanded} timeout='auto' unmountOnExit>
                    <CardContent sx={{ padding: '0 0 0.5em 0.5em !important' }}>
                        <TaskCardExpansion />
                    </CardContent>
                </Collapse>
            </CardContent>
        </Card>
    )
}