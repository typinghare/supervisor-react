/**
 * Local user.
 */
export class LocalUser {
    private static _INSTANCE: LocalUser

    public static INSTANCE(): LocalUser {
        if (LocalUser._INSTANCE == null) {
            LocalUser._INSTANCE = new LocalUser()
        }

        return LocalUser._INSTANCE
    }

    private _userId ?: number
    private _token ?: string
    private _username?: string
    private _isSignedIn?: boolean

    /**
     * Users signs in.
     * @param userId user's id.
     * @param token token string
     * @param username username
     */
    public signIn(userId: number, token: string, username: string): void {
        this._userId = userId
        this._token = token
        this._username = username
        this._isSignedIn = true
    }

    public signOut() {
        this._userId = undefined
        this._token = undefined
        this._username = undefined
        this._isSignedIn = false
    }

    get userId(): number | undefined {
        return this._userId
    }

    get token(): string | undefined {
        return this._token
    }

    get username(): string | undefined {
        return this._username
    }

    get isSignedIn(): boolean | undefined {
        return this._isSignedIn
    }
}