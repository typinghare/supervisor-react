import {
    Alert,
    Button,
    ButtonGroup,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Grid,
} from '@mui/material'
import { TaskCard } from '../../TaskCard/TaskCard'
import { TaskStage } from '../../../common/enum/TaskStage'
import { TaskAction } from '../../../common/enum/TaskAction'
import { collectStyles } from '../../../common/functions/style'
import { useMutation } from '@tanstack/react-query'
import Api from '../../../common/api'
import { TaskDto } from '../../../dto/TaskDto'
import { convertTaskDtoToTask } from '../../../common/functions/conversion'
import { useAppSelector } from '../../../redux/hooks'
import { selectToken } from '../../../redux/slice/UserSlice'
import PlayArrowIcon from '@mui/icons-material/PlayArrow'
import PauseIcon from '@mui/icons-material/Pause'
import DeleteIcon from '@mui/icons-material/Delete'
import useSwitch from '../../../hook/useSwitch'

export interface ControlTaskDashboardProps {
    selectedTaskDto?: TaskDto
    onTaskUpdate: (updatedTaskDto: TaskDto | undefined) => void
}

export function ControlTaskDashboard(props: ControlTaskDashboardProps): JSX.Element {
    const { selectedTaskDto, onTaskUpdate } = props
    const token = useAppSelector(selectToken)
    const [isDeleteAlertDialogShow, openDeleteAlterDialog, closeDeleteAlterDialog] = useSwitch()

    const { mutate: updateTask, isLoading: isUpdatingTask } = useMutation(Api.updateTask, {
        onSuccess: (response: Api.HttpResponse<TaskDto>) => {
            const taskDto = response.data
            onTaskUpdate(taskDto)
        },
    })

    const { mutate: deleteTask, isLoading: isDeletingTask } = useMutation(Api.deleteTask, {
        onSuccess: () => {
            onTaskUpdate(undefined)
        },
    })

    function handleUpdateTaskStageProvider(taskAction: TaskAction) {
        return function() {
            if (!token || !selectedTask) return

            const taskId = selectedTask.id
            updateTask({ token, taskId, taskAction })
        }
    }

    function handleDeleteTaskClick() {
        openDeleteAlterDialog()
    }

    function handleDeleteTask() {
        closeDeleteAlterDialog()
        if (token && selectedTaskDto) {
            deleteTask({ token, taskId: selectedTaskDto.id })
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
                        startIcon={<PlayArrowIcon />}
                    >
                        Start
                    </Button>

                    {selectedTask.taskStage === TaskStage.ONGOING && (
                        <Button
                            variant='contained'
                            color='warning'
                            disabled={selectedTask.taskStage !== TaskStage.ONGOING}
                            onClick={handleUpdateTaskStageProvider(TaskAction.PAUSE)}
                            startIcon={<PauseIcon />}
                        >
                            Pause
                        </Button>
                    )}

                    {selectedTask.taskStage === TaskStage.PAUSED && (
                        <Button
                            variant='contained'
                            color='secondary'
                            onClick={handleUpdateTaskStageProvider(TaskAction.RESUME)}
                            startIcon={<PlayArrowIcon />}
                        >
                            Resume
                        </Button>
                    )}

                    <Button
                        variant='contained'
                        color='success'
                        disabled={![TaskStage.ONGOING, TaskStage.PAUSED].includes(selectedTask.taskStage)}
                        onClick={handleUpdateTaskStageProvider(TaskAction.FINISH)}
                        startIcon={<PauseIcon />}
                    >
                        End
                    </Button>

                    <Button
                        variant='contained'
                        color='error'
                        onClick={handleDeleteTaskClick}
                        startIcon={<DeleteIcon />}
                        disabled={isDeletingTask}
                    >
                        Delete
                    </Button>

                    <Dialog
                        fullWidth
                        open={isDeleteAlertDialogShow}
                        onClose={closeDeleteAlterDialog}
                    >
                        <DialogTitle>
                            Delete Confirmation
                        </DialogTitle>
                        <DialogContent>
                            <DialogContentText>
                                Do you really want to delete this task?
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button
                                onClick={handleDeleteTask}
                                variant='contained'
                                color='error'
                                sx={{ maxWidth: '6rem' }}
                            >Delete</Button>
                            <Button
                                onClick={closeDeleteAlterDialog}
                                autoFocus
                                color='inherit'
                                sx={{ maxWidth: '6rem' }}
                            >
                                Cancel
                            </Button>
                        </DialogActions>
                    </Dialog>
                </ButtonGroup>
            </Grid>
        </Grid>
    )
}