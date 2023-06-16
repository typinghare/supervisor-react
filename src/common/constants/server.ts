/**
 * This namespace contains constants that are relevant to the server.
 */
export namespace Server {
    /**
     * The domain of the backend server.
     */
    export const ApiDomain = 'jameschan.us'

    // The protocol.
    export const ApiProtocol: 'http' | 'https' = 'https'

    // The base URL for the backend server.
    export const ApiBaseUrl = `${ApiProtocol}://${ApiDomain}/api/supervisor`

    // Api date time format
    export const DATETIME_FORMAT: string = 'YYYY-MM-DD HH:mm:ss'
}
