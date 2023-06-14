import { Alert, Box } from '@mui/material'
import { useUser } from '../state/user'
import { TaskCard, TaskCardProps } from './Task/TaskCard'
import { useEffect, useState } from 'react'
import { TaskDto } from '../dto/TaskDto'
import { convertTaskDtoToTask } from '../common/conversion'
import { useMutation } from '@tanstack/react-query'
import { getTasksForUser } from '../api/task.api'
import { HttpResponse } from '../common/api'
import { TaskStage } from '../common/constant'
import _ from 'lodash'

export function NewTabPanel(): JSX.Element {
    const { userId } = useUser()
    // const [selectedTask, setSelectedTask] = useState<TaskDto | undefined>(undefined)
    // const { mutate } = useMutation(getTasksForUser, {
    //     onSuccess: (response: HttpResponse<TaskDto[]>): void => {
    //         const taskDtoList: TaskDto[] = response.data
    //
    //         // Find ongoing task.
    //         const onGoingTask: TaskDto | undefined = _.find(taskDtoList, taskDto => {
    //             return taskDto.stage === TaskStage.ONGOING
    //         })
    //
    //         if (onGoingTask) {
    //             setSelectedTask(onGoingTask)
    //         } else {
    //             setSelectedTask(taskDtoList[0])
    //         }
    //     },
    // })
    //
    // useEffect(() => {
    //     if (userId !== undefined) {
    //         const taskStageString = [TaskStage.ONGOING, TaskStage.PAUSED, TaskStage.ENDED].join(' ')
    //         mutate({ userId, fromTimestamp: 1, toTimestamp: new Date().getTime(), taskStageString })
    //     }
    // }, [mutate, userId])

    return (
        <Box>
            {/*{*/}
            {/*    selectedTask && (*/}
            {/*        <SelectedTaskPanel selectedTask={convertTaskDtoToTask(selectedTask)} />*/}
            {/*    )*/}
            {/*}*/}

            {/*{*/}
            {/*    !selectedTask && (*/}
            {/*        <Alert>*/}
            {/*            Create a task first!*/}
            {/*        </Alert>*/}
            {/*    )*/}
            {/*}*/}

        </Box>
    )
}

export interface SelectedTaskPanelProps {
    selectedTask: TaskCardProps
}

export function SelectedTaskPanel(props: SelectedTaskPanelProps): JSX.Element {
    const { selectedTask } = props

    return (
        <Box>
            <TaskCard {...selectedTask} />
        </Box>
    )
}