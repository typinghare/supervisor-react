import { CategoryDto } from '../dto/CategoryDto'
import axios from 'axios'

/**
 * Gets categories.
 * @param subjectId
 */
export const getCategoriesForSubject = async function(subjectId: number): Promise<CategoryDto[]> {
    return (await axios.get(`/subjects/${subjectId}/categories/`)).data
}

/**
 * Creates a category.
 * @param categoryDto
 */
export const createSubject = async function(categoryDto: CategoryDto): Promise<CategoryDto> {
    return (await axios.post(`/categories/`, categoryDto)).data
}

/**
 * Updates a category.
 * @param categoryId
 * @param categoryDto
 */
export const updateSubject = async function(categoryId: number, categoryDto: CategoryDto): Promise<CategoryDto> {
    return (await axios.put(`/categories/${categoryId}/`, categoryDto)).data
}

/**
 * Deletes a category.
 * @param categoryId
 */
export const deleteCategory = async function(categoryId: number): Promise<void> {
    return (await axios.delete(`/categories/${categoryId}/`)).data
}