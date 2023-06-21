import { Box, Grid } from '@mui/material'
import { useMutation } from '@tanstack/react-query'
import Api from '../../../common/api'
import { useCallback, useEffect, useState } from 'react'
import { TaskStage } from '../../../common/enum/TaskStage'
import moment from 'moment'
import { TaskDto } from '../../../dto/TaskDto'
import { AreaChart, DateMinutesDatum } from './AreaChart'
import { convertDateToDateString } from '../../../common/functions/conversion'
import { collectStyles } from '../../../common/functions/style'
import { SubjectMinuteDatum, SubjectPieChart } from './SubjectPieChart'
import { HourMinuteSecond } from '@typinghare/hour-minute-second'
import HttpResponse = Api.HttpResponse

export interface ChartPanelProps {
    userId: number
}

export function ChartPanel(props: ChartPanelProps): JSX.Element {
    const { userId } = props
    const [days] = useState<number>(7)
    const [endedTaskDtoList, setEndedTaskDtoList] = useState<undefined | TaskDto[]>([])

    const { mutate: getEndedTaskDtoList, isLoading: isGettingTaskList } = useMutation(Api.getTasksForUser, {
        onSuccess: (response: HttpResponse<TaskDto[]>) => {
            setEndedTaskDtoList(response.data)
        },
    })

    const getEndedTasks = useCallback(() => {
        const momentDate = moment()

        getEndedTaskDtoList({
            userId,
            fromTimestamp: momentDate.subtract(days, 'day').startOf('day').toDate().getTime(),
            toTimestamp: new Date().getTime(),
            taskStageString: [TaskStage.ENDED].join(' '),
        })
    }, [userId, getEndedTaskDtoList, days])

    useEffect(() => {
        getEndedTasks()
    }, [getEndedTasks, days])

    if (isGettingTaskList || !endedTaskDtoList) {
        return (
            <Box>
                Loading ...
            </Box>
        )
    }

    function getMinutes(seconds: number) {
        return Math.floor(seconds / HourMinuteSecond.SECOND_IN_MINUTE)
    }

    // Aggregation.
    const dateMinutesData: DateMinutesDatum[] = (function(taskDtoList) {
        const momentDate = moment()
        const dateMinutePairList = [] as DateMinutesDatum[]

        const dateTotalMinutesMap: Record<string, number> = {}
        taskDtoList.forEach(taskDto => {
            const createdAtDateString = taskDto.createdAt.split(' ')[0]
            if (dateTotalMinutesMap.hasOwnProperty(createdAtDateString)) {
                dateTotalMinutesMap[createdAtDateString] += getMinutes(taskDto.duration)
            } else {
                dateTotalMinutesMap[createdAtDateString] = getMinutes(taskDto.duration)
            }
        })

        for (let i = days; i >= 0; i--) {
            const date = momentDate.clone().subtract(i, 'day').toDate()
            const dateString = convertDateToDateString(date)

            dateMinutePairList.push({
                date, minutes: dateTotalMinutesMap[dateString] || 0,
            })
        }

        return dateMinutePairList
    })(endedTaskDtoList)

    const subjectMinutesData: SubjectMinuteDatum[] = (function(taskDtoList) {
        const subjectMinutesMap: Record<string, number> = {}

        taskDtoList.forEach(taskDto => {
            const subjectName = taskDto.subjectName
            if (subjectMinutesMap.hasOwnProperty(subjectName)) {
                subjectMinutesMap[subjectName] += getMinutes(taskDto.duration)
            } else {
                subjectMinutesMap[subjectName] = getMinutes(taskDto.duration)
            }
        })

        return Object.entries(subjectMinutesMap).map(([subjectName, totalMinutes]) => ({
            subjectName, minutes: totalMinutes,
        }))
    })(endedTaskDtoList)

    const styles = collectStyles({
        root: {
            marginTop: '1.5em',
        },
        areaChartGrid: {
            marginBottom: '6em',
        },
    })

    return (
        <Box sx={styles.root}>
            <Grid container>
                <Grid item xs={12} sm={12} md={12} lg={6} xl={6}>
                    <AreaChart data={dateMinutesData} />
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={6} xl={6}>
                    <SubjectPieChart data={subjectMinutesData} />
                </Grid>
            </Grid>
        </Box>
    )
}