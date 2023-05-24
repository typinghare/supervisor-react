/**
 * The domain of the API server.
 */
export const domain: string = 'jameschan.us'

/**
 * Cookie keys.
 */
export const CookieKey = {
    USER_ID: 'USER_ID',
    TOKEN: 'TOKEN',
    USERNAME: 'USERNAME',
}

export const RedirectUrl = {
    ABOUT: '/supervisor/about',
    USER: '/supervisor/user',
    SIGN_IN: '/supervisor/user',
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