import { Box } from '@mui/material'
import { TaskCard, TaskCardProps } from './TaskCard'
import { collectStyles } from '../../common/functions/style'

export interface TaskCardWrapperProps extends TaskCardProps {
    shine?: boolean
}

export function TaskCardWrapper(props: TaskCardWrapperProps): JSX.Element {
    const { shine, ...taskCardProps } = props

    const styles = collectStyles({
        root: {
            boxShadow: shine ? '0 0 14px 9px #d0e7b7' : 'none',
        },
    })

    return (
        <Box sx={styles.root}>
            <TaskCard {...taskCardProps}></TaskCard>
        </Box>
    )
}