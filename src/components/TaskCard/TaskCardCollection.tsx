import { Grid } from '@mui/material'
import { Task, TaskCard } from './TaskCard'

export interface WorklistProps {
    taskList: Task[]
}

export function TaskCardCollection(props: WorklistProps): JSX.Element {
    const { taskList } = props

    const taskCardList: JSX.Element[] = taskList.map(task => {
        return (
            <Grid item xs={12} md={6} key={task.id}>
                <TaskCard {...task} />
            </Grid>
        )
    })

    return (
        <Grid container spacing={2}>
            {taskCardList}
        </Grid>
    )
}