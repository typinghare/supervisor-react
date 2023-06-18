import { NewTask } from './NewTask'
import { NewCategory } from './NewCategory'
import { Box } from '@mui/material'
import { collectStyles } from '../../../common/functions/style'
import { NewSubject } from './NewSubject'

export interface NewPanelProps {
    userId: number
}

export function NewPanel(props: NewPanelProps): JSX.Element {
    const { userId } = props

    const styles = collectStyles({
        newTaskContainer: {
            marginBottom: '2em',
        },
        newCategoryContainer: {
            marginBottom: '2em',
        },
    })

    return (
        <>
            <Box sx={styles.newTaskContainer}>
                <NewTask />
            </Box>
            <Box sx={styles.newCategoryContainer}>
                <NewCategory />
            </Box>
            <Box>
                <NewSubject />
            </Box>
        </>
    )
}


