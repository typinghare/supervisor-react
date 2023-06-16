import { Grid } from '@mui/material'
import { TaskCardSkeleton } from './TaskCardSkeleton'

export function TaskCardCollectionSkeleton(): JSX.Element {
    const array = [0, 1, 2, 3]

    return (
        <Grid container spacing={2}>
            {
                array.map(key => (
                    <Grid item xs={12} md={6} key={key}>
                        <TaskCardSkeleton />
                    </Grid>
                ))
            }
        </Grid>
    )
}