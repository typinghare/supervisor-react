import { TaskStage } from '../../common/constant'
import { MuiStyles } from '../../common/interfaces'
import { Box } from '@mui/material'
import React from 'react'
import { TaskCardProps } from './TaskCard'

export interface TaskCardTitleProps {
    taskStage: TaskCardProps['taskStage'],
    duration: TaskCardProps['duration'],
    subjectName: TaskCardProps['subjectName'],
    categoryName: TaskCardProps['categoryName'],
}

export function TaskCardTitle(props: TaskCardTitleProps): JSX.Element {
    const { taskStage, duration, subjectName, categoryName } = props

    const rightSideString: string = (function(): string {
        switch (taskStage) {
            case TaskStage.PENDING:
                return 'PENDING'
            case TaskStage.ONGOING:
                return 'ONGOING'
            case TaskStage.PAUSED:
                return `PAUSED (${duration}min)`
            case TaskStage.ENDED:
                return `${duration}min`
        }
    })()

    const styles: MuiStyles<'root' | 'subject' | 'category' | 'rightSideString'> = {
        root: {
            borderBottom: '1px solid #D5DBDB',
            paddingBottom: '0.5em',
            marginBottom: '0.5em',
        },
        subject: {
            display: 'inline-block',
            fontSize: '1.5em',
            color: 'blue',
            marginRight: '0.5em',
        },
        category: {
            display: 'inline-block',
            fontSize: '0.8em',
            color: '#666666',
        },
        rightSideString: {
            display: 'inline-block',
            fontSize: '1.25em',
            color: 'coral',
            float: 'right',
            paddingTop: '0.25em',
        },
    }

    return (
        <Box className='TaskCardTitle' sx={styles.root}>
            <Box sx={styles.subject}>
                {subjectName}
            </Box>
            <Box sx={styles.category}>
                {categoryName}
            </Box>
            <Box sx={styles.rightSideString}>
                {rightSideString}
            </Box>
        </Box>
    )
}