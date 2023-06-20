import { Box } from '@mui/material'
import { TaskCard, TaskCardProps } from './TaskCard'
import { collectStyles } from '../../common/functions/style'

export interface TaskCardWrapperProps extends TaskCardProps {
    shine?: boolean
    onClick: () => void
}

export function TaskCardWrapper(props: TaskCardWrapperProps): JSX.Element {
    const { shine, onClick, ...taskCardProps } = props

    const styles = collectStyles({
        root: {
            boxShadow: shine ? '0 0 14px 9px #d0e7b7' : 'none',
            cursor: 'pointer',
            transition: 'transform 2s ease-in-out',
        },
    })

    function handleClick() {
        onClick()
    }

    return (
        <Box
            sx={styles.root}
            onClick={handleClick}
        >
            <TaskCard {...taskCardProps}></TaskCard>
        </Box>
    )
}