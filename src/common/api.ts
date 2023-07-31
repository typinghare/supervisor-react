import axios from 'axios'
import { Server } from './constants/server'
import * as UserApi from './api/user'
import * as SubjectApi from './api/subject'
import * as CategoryApi from './api/category'
import * as TaskApi from './api/task'

namespace Api {
    export type HttpResponse<T = null> = {
        message: string,
        data: T,
    }

    export const SupervisorAxios = axios.create({
        baseURL: Server.ApiBaseUrl,
    })

    // Register all API functions here.
    export const signIn = UserApi.signIn
    export const getTasksForUser = UserApi.getTasksForUser

    export const getSubjectsForUser = SubjectApi.getSubjectsForUser
    export const createSubject = SubjectApi.createSubject
    export const updateSubject = SubjectApi.updateSubject
    export const deleteSubject = SubjectApi.deleteSubject

    export const getCategoriesForSubject = CategoryApi.getCategoriesForSubject
    export const createCategory = CategoryApi.createCategory
    export const updateCategory = CategoryApi.updateCategory
    export const deleteCategory = CategoryApi.deleteCategory
    export const getHistoricalComments = CategoryApi.getHistoricalComments

    export const createTask = TaskApi.createTask
    export const updateTask = TaskApi.updateTask
    export const deleteTask = TaskApi.deleteTask
    export const createTaskComment = TaskApi.createTaskComment
}

export default Api