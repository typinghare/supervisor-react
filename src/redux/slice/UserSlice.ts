import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../store'

export interface User {
    userId?: number,
    token?: string,
    username?: string
}

export interface UserState extends User {
}

const userSlice = createSlice({
    name: 'user',
    initialState: {
        userId: undefined,
        token: undefined,
        username: undefined,
    } as UserState,
    reducers: {
        signIn(state: UserState, action: PayloadAction<User>) {
            const { userId, token, username } = action.payload

            state.userId = userId
            state.token = token
            state.username = username
        },

        signOut(state: UserState) {
            state.userId = undefined
            state.token = undefined
            state.userId = undefined
        },
    },
})

export const { signIn, signOut } = userSlice.actions

export const selectUserId = (state: RootState) => state.user.userId
export const selectToken = (state: RootState) => state.user.token

export default userSlice.reducer