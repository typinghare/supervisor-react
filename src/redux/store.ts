import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit'
import space from './slice/SpaceSlice'

export const store = configureStore({
    reducer: {
        space,
    },
})

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;
