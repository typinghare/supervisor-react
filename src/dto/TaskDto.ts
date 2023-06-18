import { TaskCommentDto } from './TaskCommentDto'

export interface TaskDto {
    id: number,
    userId: number,
    categoryId: number,
    stage: number,
    duration: number,
    createdAt: string,
    updatedAt: string,
    startedAt: string,
    resumedAt: string,
    endedAt: string,
    subjectName: string
    categoryName: string,
    expectedDuration: number,
    taskCommentDtoList: TaskCommentDto[]
}