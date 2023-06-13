import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../store'

export type SpaceTabType = 'worklist' | 'chart' | 'console'

export const spaceTabList: SpaceTabType[] = ['worklist', 'chart', 'console']

export type SpaceState = {
    tab: SpaceTabType;
}

export const spaceSlice = createSlice({
    name: 'space',
    initialState: { tab: 'worklist' as SpaceTabType },
    reducers: {
        changeSpaceTab: (state: SpaceState, action: PayloadAction<SpaceTabType>) => {
            state.tab = action.payload
        },
    },
})

export const { changeSpaceTab } = spaceSlice.actions

export const selectSpaceTab = (state: RootState) => state.space.tab

export default spaceSlice.reducer