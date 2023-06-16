import axios from 'axios'
import { Server } from './constants/server'

export type HttpResponse<T = null> = {
    message: string,
    data: T,
}

export type HttpFailResponse = {
    message: string,
    errorCode: string
}

export const SupervisorAxios = axios.create({
    baseURL: Server.ApiBaseUrl,
})