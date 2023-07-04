import moment from 'moment'

/**
 * This namespace contains constants that are relevant to the frontend.
 */
export namespace Frontend {
    // Frontend basename.
    export const Basename = '/supervisor'

    // Query keys.
    export namespace QueryKey {
        export const Tab = 'tab'
    }

    // Cookie keys. The keys must adhere to the snack_case naming convention.
    export namespace CookieKey {
        export const UserId = 'user_id'
        export const Token = 'token'
        export const Username = 'username'
    }

    // Default cookie expire time.
    export const DEFAULT_COOKIE_EXPIRE_TIME: Date = moment().add(12, 'months').toDate()

    // Router URLs.
    export namespace Url {
        export const Home = '/'
        export const About = '/about'
        export const Space = '/space'
        export const SignIn = '/sign-in'
    }

    export type SpaceTabName = 'worklist' | 'chart' | 'new' | 'control'

    export const spaceTabNameList: SpaceTabName[] = ['worklist', 'chart', 'new', 'control']
}
