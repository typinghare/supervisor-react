import { TaskDto } from '../../dto/TaskDto'
import Api from '../api'
import { Server } from '../constants/server'
import { TaskCommentDto } from '../../dto/TaskCommentDto'

export interface CreateTaskParams {
    token: string
    categoryId: number
}

/**
 * Creates a task.
 */
export async function createTask(createTaskParams: CreateTaskParams): Promise<Api.HttpResponse<TaskDto>> {
    const { token, categoryId } = createTaskParams
    return (await Api.SupervisorAxios.post(`/tasks/`, {
        categoryId,
    }, {
        headers: {
            [Server.HeaderKey.Token]: token,
        },
    })).data
}

export interface UpdateTaskParams {
    token: string
    taskId: number
    taskAction?: number
}

/**
 * Updates a task.
 */
export async function updateTask(updateTaskParams: UpdateTaskParams): Promise<Api.HttpResponse<TaskDto>> {
    const { token, taskId, taskAction } = updateTaskParams

    return (await Api.SupervisorAxios.put(`/tasks/${taskId}/`, {
        taskAction,
    }, {
        headers: {
            [Server.HeaderKey.Token]: token,
        },
    })).data
}

export interface DeleteTaskParams {
    token: string,
    taskId: number
}

/**
 * Deletes a task.
 */
export async function deleteTask(deleteTaskParams: DeleteTaskParams): Promise<Api.HttpResponse<void>> {
    const { token, taskId } = deleteTaskParams
    return (await Api.SupervisorAxios.delete(`/tasks/${taskId}/`, {
        headers: {
            [Server.HeaderKey.Token]: token,
        },
    })).data
}

export interface CreateTaskCommentParams {
    token: string
    taskId: number
    content: string
}

export async function createTaskComment(params: CreateTaskCommentParams): Promise<Api.HttpResponse<TaskCommentDto>> {
    const { token, taskId, content } = params

    return (await Api.SupervisorAxios.post(`/tasks/${taskId}/comments/`, {
        content,
    }, {
        headers: {
            [Server.HeaderKey.Token]: token,
        },
    })).data
}