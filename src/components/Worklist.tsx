import React, { useEffect, useState } from 'react'
import { Box, BoxProps, Grid } from '@mui/material'
import { TaskDto } from '../dto/TaskDto'
import { Task, TaskCard } from './Task/TaskCard'
import { convertTaskDtoToTask } from '../common/conversion'
import { useMutation } from '@tanstack/react-query'
import { getTasksForUser } from '../api/task.api'
import { HttpResponse } from '../common/api'

export interface WorklistProps extends BoxProps {
    userId: number
    date?: Date
}

export function Worklist(props: WorklistProps): JSX.Element {
    const { userId, date } = props
    const [taskDtoList, setTaskDtoList] = useState<TaskDto[]>([])
    const { mutate, isLoading } = useMutation(getTasksForUser, {
        onSuccess: (response: HttpResponse<TaskDto[]>): void => {
            setTaskDtoList(response.data)
        },
    })

    useEffect((): void => {
        mutate({ userId, fromTimestamp: 1, toTimestamp: new Date().getTime() })
    }, [mutate, userId])

    const taskCardList: JSX.Element[] = taskDtoList.map(taskDto => {
        const taskId: number = taskDto.id
        const task: Task = convertTaskDtoToTask(taskDto)

        return (
            <Grid
                item xs={12} md={6}
                key={taskId}
            >
                <TaskCard {...task} />
            </Grid>
        )
    })

    return (
        <Box>
            <Grid container spacing={2} mt={0} children={taskCardList} />
        </Box>
    )
}