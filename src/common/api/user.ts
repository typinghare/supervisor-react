import { HttpResponse, SupervisorAxios } from '../api'
import { UserTokenDto } from '../../dto/UserTokenDto'
import { UserSignInDto } from '../../dto/UserSignInDto'
import { TaskDto } from '../../dto/TaskDto'

export async function userSignIn(userSignInDto: UserSignInDto): Promise<HttpResponse<UserTokenDto>> {
    return (await SupervisorAxios.post('/users/auth/', userSignInDto)).data
}

export interface GetTasksForUserParams {
    userId: number,
    fromTimestamp: number
    toTimestamp: number
    limit?: number
    page?: number
    categoryId?: number
    taskStageString?: string
}

/**
 * Fetches user's all tasks.
 */
export async function getTasksForUser(params: GetTasksForUserParams): Promise<HttpResponse<TaskDto[]>> {
    const { userId, fromTimestamp, toTimestamp, limit, page, categoryId, taskStageString } = params
    return (await SupervisorAxios.get(`/users/${userId}/tasks/`, {
        params: { fromTimestamp, toTimestamp, limit, page, categoryId, taskStageString },
    })).data
}