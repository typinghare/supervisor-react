import React from 'react'
import { Box, Grid } from '@mui/material'
import { TaskDto } from '../dto/TaskDto'
import { Task, TaskCard } from './TaskCard'
import { convertTaskDtoToTask } from '../common/conversion'
import { useMutation } from '@tanstack/react-query'
import { getTasksForUser } from '../api/task.api'
import { HttpResponse } from '../common/api'

export type WorklistProps = {
    userId: number
    date?: Date
}

export const Worklist: React.FC<WorklistProps> = (props): JSX.Element => {
    const { userId } = props

    const [taskDtoList, setTaskDtoList] = React.useState<TaskDto[]>([])
    const { mutate, isLoading } = useMutation(getTasksForUser, {
        onSuccess: (response: HttpResponse<TaskDto[]>): void => {
            const _taskDtoList = response.data
            setTaskDtoList(_taskDtoList)
        },
    })

    React.useEffect((): void => {
        mutate({ userId, fromTimestamp: 1, toTimestamp: 1 })
    }, [mutate, userId])

    const taskCardList: JSX.Element[] = taskDtoList.map(taskDto => {
        const taskId: number = taskDto.id
        const task: Task = convertTaskDtoToTask(taskDto)

        return <Grid item xs={12} md={6} key={taskId}><TaskCard {...task} /></Grid>
    })

    return <Box>
        <Grid container spacing={2} mt={0} children={taskCardList} />
    </Box>
}