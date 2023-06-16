import { TaskDto } from '../../dto/TaskDto'
import moment from 'moment/moment'
import { Task } from '../../components/TaskCard/TaskCard'

export const convertTaskDtoToTask = function(taskDto: TaskDto): Task {
    return {
        id: taskDto.id,
        taskStage: taskDto.stage,
        subjectName: taskDto.subjectName,
        categoryName: taskDto.categoryName,
        commentArray: [],
        // createdAt: convertDateStringToDate(taskDto.createdAt)!,
        // startedAt: convertDateStringToDate(taskDto.startedAt),
        // endedAt: convertDateStringToDate(taskDto.endedAt),
        // resumedAt: convertDateStringToDate(taskDto.resumedAt),
        duration: taskDto.duration,
        expectedDuration: 0,
    }
}

export const convertDateStringToDate = function(dateString: string | null, format: string = ''): Date | undefined {
    if (!dateString) return undefined

    return moment(dateString, format, true).toDate()
}