import { useCallback, useEffect, useState } from 'react'
import { Box, IconButton, Tooltip } from '@mui/material'
import moment from 'moment'
import { collectStyles } from '../../common/functions/style'
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth'
import { DatePickerDialog } from '../Common/DatePickerDialog'
import { useSwitch } from '../../hook/useSwitch'
import { useMutation } from '@tanstack/react-query'
import { getTasksForUser } from '../../common/api/user'
import { HttpResponse } from '../../common/api'
import { TaskDto } from '../../dto/TaskDto'
import { convertTaskDtoToTask } from '../../common/functions/conversion'
import { TaskCardCollection } from '../TaskCard/TaskCardCollection'
import { Task } from '../TaskCard/TaskCard'
import { TaskCardCollectionSkeleton } from '../TaskCard/TaskCardCollectionSkeleton'

export interface WorklistProps {
    userId: number,
    date?: Date
}

export function Worklist(props: WorklistProps): JSX.Element {
    const { userId, date: optionalDate } = props
    const [date, setDate] = useState(optionalDate || new Date())
    const [isDialogOpen, openDialog, closeDialog] = useSwitch()
    const [taskList, setTaskList] = useState<Task[]>([])
    const { mutate, isLoading } = useMutation(getTasksForUser, {
        onSuccess: (response: HttpResponse<TaskDto[]>) => {
            const taskDtoList = response.data
            const taskList = taskDtoList.map(convertTaskDtoToTask)
            setTaskList(taskList)
        },
    })

    function getDateString(date: Date): string {
        return moment(date).format('MMM Do, YYYY')
    }

    const loadTaskList = useCallback(() => {
        mutate({
            userId,
            fromTimestamp: 1,
            toTimestamp: new Date().getTime(),
        })
    }, [mutate, userId])

    function handleDateSelected(date: Date) {
        closeDialog()
        setDate(date)
        loadTaskList()
    }

    useEffect(() => {
        loadTaskList()
    }, [loadTaskList])

    const styles = collectStyles({
        header: {
            display: 'flex',
            alignItems: 'center',
            marginBottom: '1em',
        },
        dateString: {
            display: 'inline-block',
            fontSize: '2em',
            fontWeight: 'bold',
        },
    })

    return (
        <>
            <Box sx={styles.header}>
                <Box sx={styles.dateString}>
                    {getDateString(date)}
                </Box>

                <Tooltip title={'Pick up a date.'}>
                    <IconButton onClick={openDialog}>
                        <CalendarMonthIcon />
                    </IconButton>
                </Tooltip>

                <DatePickerDialog
                    open={isDialogOpen}
                    onClose={closeDialog}
                    onDateSelected={handleDateSelected}
                />
            </Box>

            {!isLoading && (
                <TaskCardCollection taskList={taskList} />
            )}

            {isLoading && (
                <TaskCardCollectionSkeleton />
            )}
        </>
    )
}