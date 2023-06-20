import { Alert, Button, ButtonGroup, Grid } from '@mui/material'
import { TaskCard } from '../../TaskCard/TaskCard'
import { TaskStage } from '../../../common/enum/TaskStage'
import { TaskAction } from '../../../common/enum/TaskAction'
import { collectStyles } from '../../../common/functions/style'
import { useMutation } from '@tanstack/react-query'
import Api from '../../../common/api'
import { TaskDto } from '../../../dto/TaskDto'
import { useToken } from '../../../hook/useToken'
import { convertTaskDtoToTask } from '../../../common/functions/conversion'

export interface ControlTaskDashboardProps {
    selectedTaskDto?: TaskDto
    onTaskUpdate: (updatedTaskDto: TaskDto) => void
}

export function ControlTaskDashboard(props: ControlTaskDashboardProps): JSX.Element {
    const { selectedTaskDto, onTaskUpdate } = props
    const token = useToken()

    const { mutate: updateTask, isLoading: isUpdatingTask } = useMutation(Api.updateTask, {
        onSuccess: (response: Api.HttpResponse<TaskDto>) => {
            const taskDto = response.data
            onTaskUpdate(taskDto)
        },
    })

    function handleUpdateTaskStageProvider(taskAction: TaskAction) {
        return function() {
            if (!token || !selectedTask) return

            const taskId = selectedTask.id
            updateTask({ token, taskId, taskAction })
        }
    }

    const styles = collectStyles({
        root: {
            alignItems: 'center',
        },
        taskCardContainer: {
            marginBottom: '0.5em',
        },
    })

    if (!selectedTaskDto) {
        return (
            <Alert severity='warning'>
                You don't have any task today. Create a task first!
            </Alert>
        )
    }

    const selectedTask = convertTaskDtoToTask(selectedTaskDto)
    return (
        <Grid container spacing={1} sx={styles.root}>
            <Grid item xs={12} md={6} lg={6} xl={6} sx={styles.taskCardContainer}>
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