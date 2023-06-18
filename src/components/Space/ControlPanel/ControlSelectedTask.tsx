import { Alert, Box, Button, ButtonGroup, Grid } from '@mui/material'
import { useAppSelector } from '../../../redux/hooks'
import { selectUserId } from '../../../redux/slice/UserSlice'
import { useEffect, useState } from 'react'
import { useMutation } from '@tanstack/react-query'
import Api from '../../../common/api'
import moment from 'moment'
import { TaskDto } from '../../../dto/TaskDto'
import { Task, TaskCard } from '../../TaskCard/TaskCard'
import { convertTaskDtoToTask } from '../../../common/functions/conversion'
import { TaskStage } from '../../../common/enum/TaskStage'
import { TaskAction } from '../../../common/enum/TaskAction'
import { useToken } from '../../../hook/useToken'
import { TaskCardSkeleton } from '../../TaskCard/TaskCardSkeleton'
import { find } from 'lodash'

export function ControlSelectedTask(): JSX.Element {
    const userId = useAppSelector(selectUserId)
    const token = useToken()
    const [selectedTask, setSelectedTask] = useState<Task | undefined>()

    const { mutate: getAllTasks, isLoading: isGettingAllTasks } = useMutation(Api.getTasksForUser, {
        onSuccess: (response: Api.HttpResponse<TaskDto[]>) => {
            const taskDtoList = response.data

            if (taskDtoList.length === 0) return

            // Find an ongoing task.
            const onGoingTaskDto = find(taskDtoList, taskDto => {
                return taskDto.stage === TaskStage.ONGOING
            })

            const selectedTaskDto = onGoingTaskDto || taskDtoList[0]

            setSelectedTask(convertTaskDtoToTask(selectedTaskDto))
        },
    })

    const { mutate: updateTask, isLoading: isUpdatingTask } = useMutation(Api.updateTask, {
        onSuccess: (response: Api.HttpResponse<TaskDto>) => {
            const taskDto = response.data
            setSelectedTask(convertTaskDtoToTask(taskDto))
        },
    })

    useEffect(() => {
        const date = moment()

        if (userId) {
            getAllTasks({
                userId,
                fromTimestamp: date.startOf('day').toDate().getTime(),
                toTimestamp: date.endOf('day').toDate().getTime(),
            })
        }
    }, [getAllTasks, userId])

    function handleUpdateTaskStageProvider(taskAction: TaskAction) {
        return function() {
            if (!token || !selectedTask) return

            updateTask({ token, taskId: selectedTask.id, taskAction })
        }
    }

    if (!userId) {
        return (
            <Box>
                <Alert severity='error'>
                    You haven't signed in yet.
                </Alert>
            </Box>
        )
    }

    if (isGettingAllTasks) {
        return <TaskCardSkeleton />
    }

    if (!selectedTask) {
        return (
            <Alert severity='warning'>
                You don't have task today. Create a task first!
            </Alert>
        )
    }

    return (
        <Grid container spacing={1}>
            <Grid item xs={12} md={6} lg={6} xl={6}>
                <TaskCard {...selectedTask} />
            </Grid>

            <Grid item xs={12} md={6} lg={6} xl={6}>
                <ButtonGroup
                    fullWidth
                    disabled={isUpdatingTask}
                >
                    <Button
                        variant='contained'
                        color='success'
                        disabled={selectedTask.taskStage !== TaskStage.PENDING}
                        onClick={handleUpdateTaskStageProvider(TaskAction.START)}
                    >
                        Start
                    </Button>

                    <Button
                        variant='contained'
                        color='warning'
                        disabled={selectedTask.taskStage !== TaskStage.ONGOING}
                        onClick={handleUpdateTaskStageProvider(TaskAction.PAUSE)}
                    >
                        Pause
                    </Button>

                    <Button
                        variant='contained'
                        color='secondary'
                        disabled={selectedTask.taskStage !== TaskStage.PAUSED}
                        onClick={handleUpdateTaskStageProvider(TaskAction.RESUME)}
                    >
                        Resume
                    </Button>

                    <Button
                        variant='contained'
                        color='success'
                        disabled={![TaskStage.ONGOING, TaskStage.PAUSED].includes(selectedTask.taskStage)}
                        onClick={handleUpdateTaskStageProvider(TaskAction.FINISH)}
                    >
                        End
                    </Button>
                </ButtonGroup>
            </Grid>
        </Grid>
    )
}