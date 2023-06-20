import { TaskDto } from '../../dto/TaskDto'
import moment from 'moment/moment'
import { Task } from '../../components/TaskCard/TaskCard'
import { HourMinuteSecond, SlowHourMinuteSecond } from '@typinghare/hour-minute-second'
import { Server } from '../constants/server'

export const convertTaskDtoToTask = function(taskDto: TaskDto): Task {
    return {
        id: taskDto.id,
        taskStage: taskDto.stage,
        subjectName: taskDto.subjectName,
        categoryName: taskDto.categoryName,
        createdAt: convertDateStringToDate(taskDto.createdAt)!,
        startedAt: convertDateToTime(convertDateStringToDate(taskDto.startedAt)),
        endedAt: convertDateToTime(convertDateStringToDate(taskDto.endedAt)),
        resumedAt: convertDateStringToDate(taskDto.resumedAt),
        duration: taskDto.duration,
        expectedDuration: taskDto.expectedDuration,
        commentArray: taskDto.taskCommentDtoList.map(taskCommentDto => {
            return taskCommentDto.content
        }),
    }
}

export const convertDateStringToDate = function(dateString: string | null, format: string = ''): Date | undefined {
    if (!dateString) return undefined

    return moment(dateString, format, true).toDate()
}

export function convertDateToDateString(date: Date): string {
    return moment(date).format(Server.DateFormat)
}

export const convertDateToTime = function(date: Date | undefined): HourMinuteSecond | undefined {
    if (!date) return undefined

    const time = SlowHourMinuteSecond.ofHours(date.getHours())
    time.extendMinute(date.getMinutes())

    return time
}