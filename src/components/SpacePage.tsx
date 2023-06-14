import React, { useEffect } from 'react'
import { Alert, Tab, Tabs } from '@mui/material'
import { useParams } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../redux/hooks'
import { selectSpaceTab, spaceTabList, SpaceTabType, switchSpaceTab } from '../redux/slice/SpaceSlice'
import { getStringAfterSharp } from '../common/url'
import FactCheckIcon from '@mui/icons-material/FactCheck'
import EqualizerIcon from '@mui/icons-material/Equalizer'
import { TabContext, TabPanel } from '@mui/lab'
import { useUser } from '../state/user'
import { MuiStyles } from '../common/interfaces'
import { Page } from './Layout/Page'
import { WorklistTabPanel } from './WorklistTabPanel'
import AddIcon from '@mui/icons-material/Add'
import { ChartTabPanel } from './ChartTabPanel'
import { NewTabPanel } from './NewTabPanel'

export function SpacePage(): JSX.Element {
    const { userId: userIdString } = useParams()
    const { userId: localUserId } = useUser()
    const currentSpaceTab = useAppSelector(selectSpaceTab)
    const dispatch = useAppDispatch()

    const userId: number = parseInt(userIdString || '0') || (localUserId || 0)

    const styles: MuiStyles<'tabPanel' | 'alert'> = {
        alert: {
            width: '100%',
            padding: '1rem',
        },
        tabPanel: {
            padding: { xs: '12px !important' },
        },
    }

    // When loading the space at the first time, redirect to the corresponding tab.
    useEffect((): void => {
        const spaceTab = getStringAfterSharp(window.location.href) as SpaceTabType
        if (spaceTabList.includes(spaceTab) && currentSpaceTab !== spaceTab) {
            dispatch(switchSpaceTab(spaceTab))
        }
    }, [currentSpaceTab, dispatch])

    if (userId <= 0) {
        // Incorrect user id given.
        return (
            <Alert severity='error' sx={styles.alert}>
                Incorrect user id: [ ${userId} ].
            </Alert>
        )
    }

    const handleTabChange = (event: React.SyntheticEvent, value: string): void => {
        dispatch(switchSpaceTab(value as SpaceTabType))
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
                <Tab value='chart' label='Chart' iconPosition='start' icon={<EqualizerIcon />} />
                <Tab value='new' label='New' iconPosition='start' icon={<AddIcon />} />
            </Tabs>

            <TabContext value={currentSpaceTab}>
                <TabPanel
                    value={spaceTabList[0]}
                    sx={styles.tabPanel}
                >
                    <WorklistTabPanel userId={userId} />
                </TabPanel>

                <TabPanel
                    value={spaceTabList[1]}
                    sx={styles.tabPanel}
                >
                    <ChartTabPanel />
                </TabPanel>

                <TabPanel
                    value={spaceTabList[2]}
                    sx={styles.tabPanel}
                >
                    <NewTabPanel />
                </TabPanel>
            </TabContext>
        </Page>
    )
}