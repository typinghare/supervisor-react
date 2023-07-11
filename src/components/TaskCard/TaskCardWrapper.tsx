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
            boxShadow: shine ? '0 0 12px 9px #d0e7b7' : 'none',
            cursor: 'pointer',
            transition: 'box-shadow 0.5s ease-in-out, margin 0.3s ease-in-out',
            marginTop: '0.5rem',
            '&:hover': {
                marginTop: '0',
                marginBottom: '0.5rem'
            },
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