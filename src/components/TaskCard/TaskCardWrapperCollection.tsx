import { Task } from './TaskCard'
import { Grid } from '@mui/material'
import { TaskCardWrapper } from './TaskCardWrapper'

export interface TaskCardWrapperCollectionProps {
    taskList: Task[]
    selectedTaskId: number
    onSelect: (taskId: number) => void
}

export function TaskCardWrapperCollection(props: TaskCardWrapperCollectionProps): JSX.Element {
    const { taskList, selectedTaskId, onSelect } = props

    function handleClickProvider(taskId: number) {
        return function() {
            onSelect(taskId)
        }
    }

    return (
        <Grid container spacing={2}>
            {taskList.map((task) => (
                    <Grid item xs={12} md={6} key={task.id}>
                        <TaskCardWrapper
                            shine={task.id === selectedTaskId}
                            onClick={handleClickProvider(task.id)}
                            {...task}
                        />
                    </Grid>
                ),
            )}
        </Grid>
    )
}