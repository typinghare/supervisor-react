import { AxiosResponse } from 'axios'

export type ResponsePacket<D = any> = {
    message: string;
    data: D
}

/**
 * A function that returns an Axios instance.
 */
export type AxiosProvider<D = any> = () => Promise<AxiosResponse<ResponsePacket<D>>>;

export type ApiSettings = {
    // The throttle in milliseconds.
    throttle: number

    // The timestamp of last request.
    lastRequestTime: number

    // The number of times this API has been used.
    requestCount: number
}

export type ApiSettingsMap = { [name: string]: ApiSettings }

export class ApiManager {
    private readonly apiSettingsMap: ApiSettingsMap = {}

    private getApiSettings(apiString: string): ApiSettings {
        return this.apiSettingsMap[apiString];
    }
}

