import { Box, BoxProps } from '@mui/material'
import { TaskStage } from '../../common/enum/TaskStage'
import { collectStyles } from '../../common/functions/style'

export interface TaskCardHeaderProps extends BoxProps {
    taskStage: TaskStage,
    duration: number,
    subjectName: string,
    categoryName: string
}

export function TaskCardHeader(props: TaskCardHeaderProps): JSX.Element {
    const { taskStage, duration, subjectName, categoryName, sx, ...otherProps } = props

    const styles = collectStyles({
        root: {
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            ...sx,
        },
        leftSide: {},
        rightSide: {
            marginLeft: 'auto',
            color: 'coral',
        },
        subject: {
            fontSize: '1.25em',
            fontWeight: 'bold',
            color: '#5465ff',
        },
        category: {
            fontSize: '0.9em',
            paddingTop: '0.2em',
            color: '#6c757d',
        },
    })

    const rightSideString: string = (() => {
        switch (taskStage) {
            case TaskStage.PENDING:
                return 'PENDING'
            case TaskStage.ONGOING:
                return 'ONGOING'
            case TaskStage.PAUSED:
                return `PAUSED`
            case TaskStage.ENDED:
                return `${Math.floor(duration / 60)}min`
        }
    })()

    return (
        <Box sx={styles.root} {...otherProps}>
            <Box sx={styles.leftSide}>
                <Box sx={styles.subject}>
                    {subjectName}
                </Box>
                <Box sx={styles.category}>
                    {categoryName}
                </Box>
            </Box>

            <Box sx={styles.rightSide}>
                {rightSideString}
            </Box>
        </Box>
    )
}