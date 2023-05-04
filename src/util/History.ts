import { BrowserHistory, createBrowserHistory } from 'history'

export class History {
    private static _INSTANCE: History

    public static INSTANCE(): History {
        if (History._INSTANCE == null) {
            History._INSTANCE = new History()
        }

        return History._INSTANCE
    }

    private readonly _history = createBrowserHistory({ window })

    get history(): BrowserHistory {
        return this._history
    }

    public push(to: string, state ?: any): void {
        this._history.push(to, state)
    }

    public pushAndReload(to: string, state ?: any): void {
        this.push(to, state)
        window.location.reload()
    }
}