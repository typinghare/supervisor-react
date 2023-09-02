/**
 * This namespace contains constants that are relevant to the server.
 */
export namespace Server {
    // The domain of the backend server.
    export const ApiDomain = 'www.jameschan.us'

    // The protocol.
    export const ApiProtocol: 'http' | 'https' = 'https'

    // The base URL for the backend server.
    export const ApiBaseUrl = `${ApiProtocol}://${ApiDomain}/api/supervisor`

    // Api date format
    export const DateFormat: string = 'YYYY-MM-DD'

    // Api date time format
    export const DateTimeFormat: string = 'YYYY-MM-DD HH:mm:ss'

    /**
     * Header keys.
     */
    export namespace HeaderKey {
        export const Token = 'token'
    }
}
