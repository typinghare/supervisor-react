import React from 'react'
import { Box, SxProps, Tab, Tabs } from '@mui/material'
import { useParams } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../redux/hooks'
import { changeSpaceTab, selectSpaceTab, spaceTabList, SpaceTabType } from '../redux/slice/SpaceSlice'
import { getStringAfterSharp } from '../common/url'
import FactCheckIcon from '@mui/icons-material/FactCheck'
import EqualizerIcon from '@mui/icons-material/Equalizer'
import TerminalIcon from '@mui/icons-material/Terminal'
import { TabContext, TabPanel } from '@mui/lab'
import { SupervisorContainer } from './SupervisorContainer'
import { LocalUser } from '../util/LocalUser'
import { Worklist } from './Worklist'

export const SpacePage: React.FC = (): JSX.Element => {
    const { userId: userIdString } = useParams()
    const userId: number = parseInt(userIdString || '0') || LocalUser.INSTANCE().userId || 0
    const currentSpaceTab = useAppSelector(selectSpaceTab)
    const dispatch = useAppDispatch()

    // When loading the space at the first time, redirect to the corresponding tab.
    React.useEffect((): void => {
        const spaceTab: string = getStringAfterSharp(window.location.href)
        if (spaceTabList.includes(spaceTab) && currentSpaceTab !== spaceTab) {
            dispatch(changeSpaceTab(spaceTab as SpaceTabType))
        }
    }, [currentSpaceTab, dispatch])

    if (isNaN(userId) || userId <= 0) {
        // Incorrect user id given.
        return <Box>Incorrect user id</Box>
    }

    const handleTabChange = (event: React.SyntheticEvent, value: string): void => {
        dispatch(changeSpaceTab(value as SpaceTabType))
    }

    const panelStyle: SxProps = {
        padding: { xs: '12px !important' },
    }

    return <SupervisorContainer>
        <Tabs
            value={currentSpaceTab}
            onChange={handleTabChange}
            textColor='secondary'
            indicatorColor='secondary'
        >
            <Tab value='worklist' label='Worklist' iconPosition='start' icon={<FactCheckIcon />} />
            <Tab value='graph' label='Graph' iconPosition='start' icon={<EqualizerIcon />} />
            {/*<Tab value='subject' label='Subject' iconPosition='start' icon={<CategoryIcon />} />*/}
            <Tab value='console' label='Console' iconPosition='start' icon={<TerminalIcon />} />
        </Tabs>

        <TabContext value={currentSpaceTab}>
            <TabPanel value={spaceTabList[0]} sx={panelStyle} children={<Worklist userId={userId} />} />
            <TabPanel value={spaceTabList[1]} sx={panelStyle}>
                {/*<Graph />*/}
            </TabPanel>
            <TabPanel value={spaceTabList[2]} sx={panelStyle}>
                {/*<SpaceConsole />*/}
            </TabPanel>
        </TabContext>
    </SupervisorContainer>
}