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
    private _username?: string
    private _token ?: string
    private _isSignedIn?: boolean

    /**
     * Users signs in.
     * @param userId user's id.
     * @param username username
     * @param token token string
     */
    public signIn(userId: number, username: string, token: string): void {
        this._userId = userId
        this._username = username
        this._token = token
        this._isSignedIn = true
    }

    public signOut() {
        this._userId = undefined
        this._username = undefined
        this._token = undefined
        this._isSignedIn = false
    }

    get userId(): number | undefined {
        return this._userId
    }

    get username(): string | undefined {
        return this._username
    }

    get token(): string | undefined {
        return this._token
    }

    get isSignedIn(): boolean | undefined {
        return this._isSignedIn
    }
}