import React from 'react'
import { Box, Tab, Tabs } from '@mui/material'
import { useParams } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../redux/hooks'
import { changeSpaceTab, selectSpaceTab, spaceTabList, SpaceTabType } from '../redux/slice/SpaceSlice'
import { getStringAfterSharp } from '../common/url'
import FactCheckIcon from '@mui/icons-material/FactCheck'
import EqualizerIcon from '@mui/icons-material/Equalizer'
import TerminalIcon from '@mui/icons-material/Terminal'
import { TabContext, TabPanel } from '@mui/lab'
import { Worklist } from './Worklist'
import { useUser } from '../state/user'
import { MuiStyles } from '../common/interfaces'
import { Page } from './Layout/Page'

export const SpacePage = function(): JSX.Element {
    const { userId: userIdString } = useParams()
    const user = useUser()
    const userId: number = parseInt(userIdString || '0') || (user.getUserId() || 0)
    const currentSpaceTab = useAppSelector(selectSpaceTab)
    const dispatch = useAppDispatch()

    // When loading the space at the first time, redirect to the corresponding tab.
    React.useEffect((): void => {
        const spaceTab = getStringAfterSharp(window.location.href) as SpaceTabType
        if (spaceTabList.includes(spaceTab) && currentSpaceTab !== spaceTab) {
            dispatch(changeSpaceTab(spaceTab))
        }
    }, [currentSpaceTab, dispatch])

    if (userId <= 0) {
        // Incorrect user id given.
        return <Box>Incorrect user id</Box>
    }

    const handleTabChange = (event: React.SyntheticEvent, value: string): void => {
        dispatch(changeSpaceTab(value as SpaceTabType))
    }

    const styles: MuiStyles<'tabPanel'> = {
        tabPanel: {
            padding: { xs: '12px !important' },
        },
    }

    return (
        <Page>
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
                <TabPanel value={spaceTabList[0]} sx={styles.tabPanel} children={<Worklist userId={userId} />} />
                <TabPanel value={spaceTabList[1]} sx={styles.tabPanel}>
                    {/*<Graph />*/}
                </TabPanel>
                <TabPanel value={spaceTabList[2]} sx={styles.tabPanel}>
                    {/*<SpaceConsole />*/}
                </TabPanel>
            </TabContext>
        </Page>
    )
}