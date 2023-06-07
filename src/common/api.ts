import axios from 'axios'
import { API_BASE_URL } from './constant'

export type HttpResponse<T = null> = {
    message: string,
    data: T,
}

export type HttpFailResponse = {
    message: string,
    errorCode: string
}

// Base URL
export const SupervisorAxios = axios.create({
    baseURL: API_BASE_URL,
})