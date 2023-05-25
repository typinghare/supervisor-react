import { AxiosRequest } from '../common/api.interface'
import { TaskDto } from '../dto/TaskDto'
import axios from 'axios'

/**
 * Gets user's tasks.
 * @param userId
 * @param fromTimestamp
 * @param toTimestamp
 * @param limit
 * @param page
 * @param categoryId
 * @param taskStage
 */
export const getTasksForUser: AxiosRequest<TaskDto[]> = async function(
    userId: number,
    fromTimestamp: number,
    toTimestamp: number,
    limit?: number,
    page?: number,
    categoryId?: number,
    taskStage?: number,
): Promise<TaskDto[]> {
    return (await axios.get(`/users/${userId}/tasks/`, {
        params: {
            fromTimestamp, toTimestamp, limit, page, categoryId, taskStage,
        },
    })).data
}

/**
 * Creates a task.
 * @param categoryId
 */
export const createTask: AxiosRequest<TaskDto> = async function(categoryId: number): Promise<TaskDto> {
    return (await axios.post(`/tasks/`, { param: { categoryId } })).data
}

/**
 * Updates a task.
 */
export const updateTask: AxiosRequest<TaskDto> = async function(taskId: number): Promise<TaskDto> {
    return (await axios.put(`/tasks/${taskId}/`)).data
}

/**
 * Deletes a task.
 */
export const deleteTask: AxiosRequest<void> = async function(taskId: number): Promise<void> {
    return (await axios.delete(`/tasks/${taskId}/`)).data
}