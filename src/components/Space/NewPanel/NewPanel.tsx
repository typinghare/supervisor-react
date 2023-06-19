import { NewTask } from './NewTask'
import { NewCategory } from './NewCategory'
import { Box } from '@mui/material'
import { collectStyles } from '../../../common/functions/style'
import { NewSubject } from './NewSubject'

export function NewPanel(): JSX.Element {
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


