import { Alert, Box, Divider } from '@mui/material'
import { useAppSelector } from '../../../redux/hooks'
import { selectUserId } from '../../../redux/slice/UserSlice'
import { useCallback, useEffect, useState } from 'react'
import { useMutation } from '@tanstack/react-query'
import Api from '../../../common/api'
import moment from 'moment'
import { TaskDto } from '../../../dto/TaskDto'
import { TaskCardSkeleton } from '../../TaskCard/TaskCardSkeleton'
import { ControlTaskDashboard } from './ControlTaskDashboard'
import { ControlTaskList } from './ControlTaskList'
import { find, findIndex } from 'lodash'
import { TaskStage } from '../../../common/enum/TaskStage'
import { collectStyles } from '../../../common/functions/style'

export function ControlSelectedTask(): JSX.Element {
    const userId = useAppSelector(selectUserId)
    const [notEndedTaskDtoList, setNotEndedTaskDtoList] = useState<TaskDto[] | undefined>()
    const [selectedTaskId, setSelectedTaskId] = useState<number | undefined>(undefined)

    const { mutate: getAllTasks, isLoading: isGettingAllTasks } = useMutation(Api.getTasksForUser, {
        onSuccess: (response: Api.HttpResponse<TaskDto[]>) => {
            const taskDtoList = response.data
            setNotEndedTaskDtoList(taskDtoList)

            if (taskDtoList.length > 0) {
                // Find the ongoing task if it exists.
                const ongoingTask: TaskDto | undefined = find(taskDtoList, taskDto => taskDto.stage === TaskStage.ONGOING)
                if (ongoingTask === undefined) {
                    setSelectedTaskId(taskDtoList[0].id)
                } else {
                    setSelectedTaskId(ongoingTask.id)
                }
            }
        },
    })

    const getAllNotEndedTask = useCallback(() => {
        const date = moment()

        if (userId) {
            getAllTasks({
                userId,
                fromTimestamp: date.startOf('day').toDate().getTime(),
                toTimestamp: date.endOf('day').toDate().getTime(),
                taskStageString: '0 1 2',
            })
        }
    }, [getAllTasks, userId])

    useEffect(() => {
        getAllNotEndedTask()
    }, [getAllNotEndedTask])

    function handleSelectTask(selectedTaskId: number) {
        setSelectedTaskId(selectedTaskId)
    }

    function handleTaskUpdate(updatedTaskDto: TaskDto) {
        if (notEndedTaskDtoList) {
            const newNotEndedTaskDtoList = [...notEndedTaskDtoList]
            const index: number = findIndex(newNotEndedTaskDtoList, taskDto => taskDto.id === updatedTaskDto.id)
            if (index > -1) {
                newNotEndedTaskDtoList[index] = updatedTaskDto
                setNotEndedTaskDtoList(newNotEndedTaskDtoList)
            }
        }
    }

    const styles = collectStyles({
        controlTaskDashboard: {
            marginBottom: '1em',
        },
        controlTaskList: {
            marginTop: '1em',
        },
    })

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

    const selectedTaskDto = notEndedTaskDtoList &&
        (find(notEndedTaskDtoList, taskDto => taskDto.id === selectedTaskId))

    return (
        <Box>
            <Box sx={styles.controlTaskDashboard}>
                <ControlTaskDashboard
                    selectedTaskDto={selectedTaskDto}
                    onTaskUpdate={handleTaskUpdate}
                />
            </Box>

            <Divider />

            <Box sx={styles.controlTaskList}>
                <ControlTaskList
                    taskDtoList={notEndedTaskDtoList}
                    selectedTaskId={selectedTaskId}
                    onSelect={handleSelectTask}
                />
            </Box>
        </Box>
    )
}