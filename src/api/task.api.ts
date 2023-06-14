import { TaskDto } from '../dto/TaskDto'
import { HttpResponse, SupervisorAxios } from '../common/api'

export type GetTasksForUserParams = {
    userId: number,
    fromTimestamp: number,
    toTimestamp: number,
    limit?: number,
    page?: number,
    categoryId?: number,
    taskStageString?: string,
}

/**
 * Gets user's tasks.
 */
export const getTasksForUser = async function(
    params: GetTasksForUserParams,
): Promise<HttpResponse<TaskDto[]>> {
    const { userId, fromTimestamp, toTimestamp, limit, page, categoryId, taskStageString } = params
    return (await SupervisorAxios.get(`/users/${userId}/tasks/`, {
        params: { fromTimestamp, toTimestamp, limit, page, categoryId, taskStageString },
    })).data
}

/**
 * Creates a task.
 * @param categoryId
 */
export const createTask = async function(categoryId: number): Promise<HttpResponse<TaskDto>> {
    return (await SupervisorAxios.post(`/tasks/`, { param: { categoryId } })).data
}

/**
 * Updates a task.
 */
export const updateTask = async function(taskId: number): Promise<HttpResponse<TaskDto>> {
    return (await SupervisorAxios.put(`/tasks/${taskId}/`)).data
}

/**
 * Deletes a task.
 */
export const deleteTask = async function(taskId: number): Promise<HttpResponse<void>> {
    return (await SupervisorAxios.delete(`/tasks/${taskId}/`)).data
}