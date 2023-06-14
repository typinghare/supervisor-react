import { useCookies } from 'react-cookie'
import { DEFAULT_COOKIE_EXPIRE_TIME, Frontend } from '../common/constant'
import { InitializableHolder } from '@typinghare/holder'
import { UserTokenDto } from '../dto/UserTokenDto'
import { useState } from 'react'

class User {
    readonly userId: number
    readonly token: string
    readonly username: string

    constructor(userId: number, token: string, username: string) {
        this.userId = userId
        this.token = token
        this.username = username
    }
}

const userHolder = InitializableHolder.of<User>()

export const useUser = function() {
    const [userId, setUserId] = useState<number | undefined>()
    const [token, setToken] = useState<string | undefined>()
    const [username, setUsername] = useState<string | undefined>()
    const [cookies, setCookies] = useCookies([Frontend.CookieKey.UserId, Frontend.CookieKey.Token, Frontend.CookieKey.Username])

    function clearUserRelatedCookies(): void {
        const current = new Date()
        setCookies(Frontend.CookieKey.UserId, null, { expires: current })
        setCookies(Frontend.CookieKey.Token, null, { expires: current })
        setCookies(Frontend.CookieKey.Username, null, { expires: current })
    }

    // Initialize the user.
    userHolder.initialize(() => {
        const userId: string | undefined = cookies[Frontend.CookieKey.UserId]
        const token: string | undefined = cookies[Frontend.CookieKey.Token]
        const username: string | undefined = cookies[Frontend.CookieKey.Username]

        if (userId !== undefined && token !== undefined && username !== undefined) {
            return new User(parseInt(userId), token, username)
        } else {
            clearUserRelatedCookies()
            return undefined
        }
    })

    const user = userHolder.get()
    if (user) {
        setUserId(user.userId)
        setToken(user.token)
        setUsername(user.username)
    }

    return {
        userId,
        token,
        username,
        signIn: (userSignInDto: UserTokenDto): void => {
            const { id: userId, token, username } = userSignInDto
            setCookies(Frontend.CookieKey.UserId, userId, { expires: DEFAULT_COOKIE_EXPIRE_TIME })
            setCookies(Frontend.CookieKey.Token, token, { expires: DEFAULT_COOKIE_EXPIRE_TIME })
            setCookies(Frontend.CookieKey.Username, username, { expires: DEFAULT_COOKIE_EXPIRE_TIME })
        },
        signOut: (): void => {
            userHolder.assign(undefined)
            clearUserRelatedCookies()
        },
        hasSignedIn: () => !userHolder.isUndefined(),
    }
}
