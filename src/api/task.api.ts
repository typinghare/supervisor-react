import { TaskDto } from '../dto/TaskDto'
import axios from 'axios'
import { HttpResponse } from '../common/api'

export type GetTasksForUserParams = {
    userId: number,
    fromTimestamp: number,
    toTimestamp: number,
    limit?: number,
    page?: number,
    categoryId?: number,
    taskStage?: number,
}

/**
 * Gets user's tasks.
 */
export const getTasksForUser = async function(
    params: GetTasksForUserParams,
): Promise<HttpResponse<TaskDto[]>> {
    const { userId, fromTimestamp, toTimestamp, limit, page, categoryId, taskStage } = params
    return (await axios.get(`/users/${userId}/tasks/`, {
        params: { fromTimestamp, toTimestamp, limit, page, categoryId, taskStage },
    })).data
}

/**
 * Creates a task.
 * @param categoryId
 */
export const createTask = async function(categoryId: number): Promise<HttpResponse<TaskDto>> {
    return (await axios.post(`/tasks/`, { param: { categoryId } })).data
}

/**
 * Updates a task.
 */
export const updateTask = async function(taskId: number): Promise<HttpResponse<TaskDto>> {
    return (await axios.put(`/tasks/${taskId}/`)).data
}

/**
 * Deletes a task.
 */
export const deleteTask = async function(taskId: number): Promise<HttpResponse<void>> {
    return (await axios.delete(`/tasks/${taskId}/`)).data
}