import Api from '../api'
import { CategoryDto } from '../../dto/CategoryDto'
import { Server } from '../constants/server'

/**
 * Gets categories.
 * @param subjectId
 */
export async function getCategoriesForSubject(subjectId: number): Promise<Api.HttpResponse<CategoryDto[]>> {
    return (await Api.SupervisorAxios.get(`/subjects/${subjectId}/categories/`)).data
}

export interface CreateCategoryParams {
    token: string
    subjectId: number
    name: string
    expectedDuration: number
}

/**
 * Creates a category.
 */
export async function createCategory(params: CreateCategoryParams): Promise<Api.HttpResponse<CategoryDto>> {
    const { token, subjectId, name, expectedDuration } = params
    return (await Api.SupervisorAxios.post(`/categories/`, {
        subjectId, name, expectedDuration,
    }, {
        headers: {
            [Server.HeaderKey.Token]: token,
        },
    })).data
}

/**
 * Updates a category.
 * @param categoryId
 * @param categoryDto
 */
export async function updateCategory(categoryId: number, categoryDto: CategoryDto): Promise<Api.HttpResponse<CategoryDto>> {
    return (await Api.SupervisorAxios.put(`/categories/${categoryId}/`, categoryDto)).data
}

/**
 * Deletes a category.
 * @param categoryId
 */
export async function deleteCategory(categoryId: number): Promise<Api.HttpResponse<void>> {
    return (await Api.SupervisorAxios.delete(`/categories/${categoryId}/`)).data
}

/**
 * Gets historical comments for a category.
 * @param categoryId
 */
export async function getHistoricalComments(categoryId: number): Promise<Api.HttpResponse<string[]>> {
    return (await Api.SupervisorAxios.get(`/categories/${categoryId}/historical-comments`)).data
}