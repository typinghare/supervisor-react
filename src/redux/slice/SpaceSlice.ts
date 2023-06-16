import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../store'
import { Frontend } from '../../common/constants/frontend'
import SpaceTabName = Frontend.SpaceTabName

export interface SpaceState {
    tabName: SpaceTabName
}

const spaceSlice = createSlice({
    name: 'space',
    initialState: {
        tabName: 'worklist' as SpaceTabName,
    },
    reducers: {
        switchSpaceTab: (state: SpaceState, action: PayloadAction<SpaceTabName>) => {
            state.tabName = action.payload
        },
    },
})

export const { switchSpaceTab } = spaceSlice.actions

export const selectSpaceTabName = (state: RootState) => state.space.tabName

export default spaceSlice.reducer