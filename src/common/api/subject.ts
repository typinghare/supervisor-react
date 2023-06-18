import Api from '../api'
import { SubjectDto } from '../../dto/SubjectDto'
import { Server } from '../constants/server'

/**
 * Gets user's subjects.
 * @param userId
 */
export async function getSubjectsForUser(userId: number): Promise<Api.HttpResponse<SubjectDto[]>> {
    return (await Api.SupervisorAxios.get(`/users/${userId}/subjects/`)).data
}

export interface CreateSubjectParams {
    token: string,
    name: string
}

/**
 * Creates a subject.
 */
export async function createSubject(params: CreateSubjectParams): Promise<Api.HttpResponse<SubjectDto>> {
    const { token, name } = params

    return (await Api.SupervisorAxios.post(`/subjects/`, {
        name,
    }, {
        headers: {
            [Server.HeaderKey.Token]: token,
        },
    })).data
}

/**
 * Updates a subject.
 * @param subjectId
 * @param subjectDto
 */
export async function updateSubject(subjectId: number, subjectDto: SubjectDto): Promise<Api.HttpResponse<SubjectDto>> {
    return (await Api.SupervisorAxios.put(`/subjects/${subjectId}/`, subjectDto)).data
}

/**
 * Deletes a subject.
 * @param subjectId
 */
export async function deleteSubject(subjectId: number): Promise<Api.HttpResponse<void>> {
    return (await Api.SupervisorAxios.delete(`/subjects/${subjectId}/`)).data
}
