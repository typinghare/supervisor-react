import moment from 'moment/moment'

export namespace Frontend {
    // Frontend basename.
    export const Basename = '/supervisor'

    export const CookieKey = {
        UserId: 'user_id',
        Token: 'token',
        Username: 'username',
    }
}

export namespace Server {
    /**
     * The domain of the backend server.
     */
    export const ApiDomain = 'jameschan.us'

    // The protocol.
    export const ApiProtocol: 'http' | 'https' = 'https'

    // The base URL for the backend server.
    export const ApiBaseUrl = `${ApiProtocol}://${ApiDomain}/api/supervisor`
}

export namespace Url {
    export const Home = '/'
    export const About = '/about'
    export const Space = '/space'
    export const SignIn = '/sign-in'
}

export enum TaskStage {
    /**
     * The task hasn't been started.
     */
    PENDING,

    /**
     * The task is ongoing and duration is counting.
     * Users cannot start another task while the task is ongoing.
     */
    ONGOING,

    /**
     * The task has been paused and duration is not counting.
     * Users can start another task if the task is paused.
     */
    PAUSED,

    /**
     * The task has been ended.
     */
    ENDED,
}

/**
 * Default cookie expire time.
 */
export const DEFAULT_COOKIE_EXPIRE_TIME: Date = moment().add(12, 'months').toDate()

export const DEFAULT_DATE_FORMAT: string = 'YYYY-MM-DD HH:mm:ss'