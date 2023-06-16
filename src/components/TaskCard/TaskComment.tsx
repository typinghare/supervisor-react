import { Box, BoxProps } from '@mui/material'
import { collectStyles } from '../../common/functions/style'

export interface TaskCommentProps extends BoxProps {
    content: string
}

export function TaskComment(props: TaskCommentProps): JSX.Element {
    const { content, sx, ...otherProps } = props

    const styles = collectStyles({
        root: {
            fontSize: '0.9em',
            ...sx,
        },
    })

    return (
        <Box sx={styles.root} {...otherProps}>
            {content}
        </Box>
    )
}