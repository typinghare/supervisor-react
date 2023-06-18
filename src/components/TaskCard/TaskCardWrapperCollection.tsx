import { Task } from './TaskCard'
import { Grid } from '@mui/material'
import { TaskCardWrapper } from './TaskCardWrapper'

export interface TaskCardWrapperCollectionProps {
    taskList: Task[]
    selectedTaskId: number
}

export function TaskCardWrapperCollection(props: TaskCardWrapperCollectionProps): JSX.Element {
    const { taskList, selectedTaskId } = props

    return (
        <Grid container spacing={2}>
            {
                taskList.map((task) => (
                    <Grid item xs={12} md={6} key={task.id}>
                        <TaskCardWrapper shine={task.id === selectedTaskId} {...task} />
                    </Grid>
                ))
            }
        </Grid>
    )
}