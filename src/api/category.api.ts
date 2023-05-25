import { AxiosRequest } from '../common/api.interface'
import { CategoryDto } from '../dto/CategoryDto'
import axios from 'axios'

/**
 * Gets categories.
 * @param subjectId
 */
export const getCategoriesForSubject: AxiosRequest<CategoryDto[]> = async function(subjectId: number): Promise<CategoryDto[]> {
    return (await axios.get(`/subjects/${subjectId}/categories/`)).data
}

/**
 * Creates a category.
 * @param categoryDto
 */
export const createSubject: AxiosRequest<CategoryDto> = async function(categoryDto: CategoryDto): Promise<CategoryDto> {
    return (await axios.post(`/categories/`, categoryDto)).data
}

/**
 * Updates a category.
 * @param categoryId
 * @param categoryDto
 */
export const updateSubject: AxiosRequest<CategoryDto> = async function(categoryId: number, categoryDto: CategoryDto): Promise<CategoryDto> {
    return (await axios.put(`/categories/${categoryId}/`, categoryDto)).data
}

/**
 * Deletes a category.
 * @param categoryId
 */
export const deleteCategory: AxiosRequest<void> = async function(categoryId: number): Promise<void> {
    return (await axios.delete(`/categories/${categoryId}/`)).data
}