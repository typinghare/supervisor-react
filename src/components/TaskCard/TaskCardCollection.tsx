import { Grid } from '@mui/material'
import { Task, TaskCard } from './TaskCard'

export interface TaskCardCollectionProps {
    taskList: Task[]
}

export function TaskCardCollection(props: TaskCardCollectionProps): JSX.Element {
    const { taskList } = props

    return (
        <Grid container spacing={2}>
            {taskList.map(task => (
                    <Grid item xs={12} md={6} key={task.id}>
                        <TaskCard {...task} />
                    </Grid>
                )
            )}
        </Grid>
    )
}