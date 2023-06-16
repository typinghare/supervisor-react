import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit'
import space from './slice/SpaceSlice'
import user from './slice/UserSlice'

export const store = configureStore({
    reducer: {
        space,
        user,
    },
})

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;
