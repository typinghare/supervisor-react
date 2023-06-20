import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../store'
import { Frontend } from '../../common/constants/frontend'
import { ValueItemEntry } from '../../components/Common/SimpleSelect'
import SpaceTabName = Frontend.SpaceTabName

export interface SpaceState {
    tabName: SpaceTabName
    subjectList: ValueItemEntry[]
}

const spaceSlice = createSlice({
    name: 'space',
    initialState: {
        tabName: 'worklist',
        subjectList: [],
    } as SpaceState,
    reducers: {
        switchSpaceTab: (state: SpaceState, action: PayloadAction<SpaceTabName>) => {
            state.tabName = action.payload
        },
        setSubjectList(state: SpaceState, action: PayloadAction<ValueItemEntry[]>) {
            state.subjectList = action.payload
        },
    },
})

export const { switchSpaceTab, setSubjectList } = spaceSlice.actions

export const selectSpaceTabName = (state: RootState) => state.space.tabName
export const selectSubjectList = (state: RootState) => state.space.subjectList

export default spaceSlice.reducer