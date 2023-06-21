import { Grid } from '@mui/material'
import { TaskCardSkeleton } from './TaskCardSkeleton'
import { range } from 'lodash'

export function TaskCardCollectionSkeleton(): JSX.Element {
    return (
        <Grid container spacing={2}>
            {range(4).map(key => (
                    <Grid item xs={12} md={6} key={key}>
                        <TaskCardSkeleton />
                    </Grid>
                ),
            )}
        </Grid>
    )
}