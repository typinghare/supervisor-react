import { CategoryDto } from './CategoryDto'

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
    categoryDto: CategoryDto
}