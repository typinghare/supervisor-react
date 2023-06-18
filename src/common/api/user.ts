import { UserTokenDto } from '../../dto/UserTokenDto'
import { UserSignInDto } from '../../dto/UserSignInDto'
import { TaskDto } from '../../dto/TaskDto'
import Api from '../api'

export async function signIn(userSignInDto: UserSignInDto): Promise<Api.HttpResponse<UserTokenDto>> {
    return (await Api.SupervisorAxios.post('/users/auth/', userSignInDto)).data
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
export async function getTasksForUser(params: GetTasksForUserParams): Promise<Api.HttpResponse<TaskDto[]>> {
    const { userId, fromTimestamp, toTimestamp, limit, page, categoryId, taskStageString } = params
    return (await Api.SupervisorAxios.get(`/users/${userId}/tasks/`, {
        params: { fromTimestamp, toTimestamp, limit, page, categoryId, taskStageString },
    })).data
}