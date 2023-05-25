import { AxiosRequest } from '../common/api.interface'
import { SubjectDto } from '../dto/SubjectDto'
import axios from 'axios'

/**
 * Gets user's subjects.
 * @param userId
 */
export const getSubjectsForUser: AxiosRequest<SubjectDto[]> = async function(userId: number): Promise<SubjectDto[]> {
    return (await axios.get(`/users/${userId}/subjects/`)).data
}

/**
 * Creates a subject.
 * @param subjectDto
 */
export const createSubject: AxiosRequest<SubjectDto> = async function(subjectDto: SubjectDto): Promise<SubjectDto> {
    return (await axios.post(`/subjects/`, subjectDto)).data
}

/**
 * Updates a subject.
 * @param subjectId
 * @param subjectDto
 */
export const updateSubject: AxiosRequest<SubjectDto> = async function(subjectId: number, subjectDto: SubjectDto): Promise<SubjectDto> {
    return (await axios.put(`/subjects/${subjectId}/`, subjectDto)).data
}

/**
 * Deletes a subject.
 * @param subjectId
 */
export const deleteSubject: AxiosRequest<void> = async function(subjectId: number): Promise<void> {
    return (await axios.delete(`/subjects/${subjectId}/`)).data
}

