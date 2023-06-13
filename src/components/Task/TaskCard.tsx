import React from 'react'
import { Box, Card, CardContent, CardProps, Collapse, SxProps } from '@mui/material'
import { TaskStage } from '../../common/constant'
import { TaskProgress, TaskProgressProps } from './TaskProgress'
import { convertDateToTime } from '../../common/date'
import { TaskComment } from './TaskComment'

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

export const TaskCard: React.FC<TaskCardProps> = function(props): JSX.Element {
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

    const Title = function(): JSX.Element {
        const rightSideString: string = (function(): string {
            switch (taskStage) {
                case TaskStage.PENDING:
                    return 'PENDING'
                case TaskStage.ONGOING:
                    return 'ONGOING'
                case TaskStage.PAUSED:
                    return `PAUSED (${duration}min)`
                case TaskStage.ENDED:
                    return `${duration}min`
            }
        })()

        const style: SxProps = {
            borderBottom: '1px solid #D5DBDB',
            paddingBottom: '0.5em',
            marginBottom: '0.5em',
        }

        const subjectStyle: SxProps = {
            display: 'inline-block',
            fontSize: '1.5em',
            color: 'blue',
            marginRight: '0.5em',
        }

        const categoryStyle: SxProps = {
            display: 'inline-block',
            fontSize: '0.8em',
            color: '#666666',
        }

        const rightSideStringStyle: SxProps = {
            display: 'inline-block',
            fontSize: '1.25em',
            color: 'coral',
            float: 'right',
            paddingTop: '0.25em',
        }

        return <Box className='TaskCardTitle' sx={style}>
            <Box sx={subjectStyle}>{subjectName}</Box>
            <Box sx={categoryStyle}>{categoryName}</Box>
            <Box sx={rightSideStringStyle}>{rightSideString}</Box>
        </Box>
    }

    const TaskCardExpansion = function(): JSX.Element {
        return <Box></Box>
    }

    const taskProgressProps: TaskProgressProps = {
        taskStage, duration, expectedDuration,
        startedAt: convertDateToTime(startedAt),
        endedAt: convertDateToTime(endedAt),
    }

    return <Card variant='elevation' elevation={3} {...cardProps}>
        <CardContent>
            <Title />

            <TaskComment content='This is a comment' />

            <TaskProgress {...taskProgressProps} />

            <Collapse in={expanded} timeout='auto' unmountOnExit>
                <CardContent sx={{ padding: '0 0 0.5em 0.5em !important' }}>
                    <TaskCardExpansion />
                </CardContent>
            </Collapse>
        </CardContent>
    </Card>
}