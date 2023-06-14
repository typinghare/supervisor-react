import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../store'

export type SpaceTabType = 'worklist' | 'chart' | 'new'

export const spaceTabList: SpaceTabType[] = ['worklist', 'chart', 'new']

export type SpaceState = {
    tab: SpaceTabType;
}

export const spaceSlice = createSlice({
    name: 'space',
    initialState: { tab: 'worklist' as SpaceTabType },
    reducers: {
        switchSpaceTab: (state: SpaceState, action: PayloadAction<SpaceTabType>) => {
            state.tab = action.payload
        },
    },
})

export const { switchSpaceTab } = spaceSlice.actions

export const selectSpaceTab = (state: RootState) => state.space.tab

export default spaceSlice.reducer