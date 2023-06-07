import moment from 'moment/moment'

/**
 * The domain of the API server for the backend.
 */
export const API_DOMAIN: string = 'jameschan.us'
// export const API_DOMAIN: string = 'localhost:8080'

/**
 * The base URL for the backend.
 */
export const API_BASE_URL: string = `https://${API_DOMAIN}/api/supervisor`

/**
 * Frontend.
 */
export const BASE_URL: string = '/supervisor'

/**
 * Cookie keys.
 */
export const CookieKey = {
    USER_ID: 'USER_ID',
    TOKEN: 'TOKEN',
    USERNAME: 'USERNAME',
}

export const RedirectUrl = {
    HOME: '/',
    ABOUT: '/about',
    SPACE: '/space',
    SIGN_IN: '/sign-in',
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