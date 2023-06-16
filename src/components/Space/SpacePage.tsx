import { Page } from '../Common/Page'
import { Alert, Box, Tab, Tabs } from '@mui/material'
import { useParams } from 'react-router-dom'
import { useAppSelector } from '../../redux/hooks'
import { selectUserId } from '../../redux/slice/UserSlice'
import { SyntheticEvent, useEffect } from 'react'
import { collectStyles } from '../../common/functions/style'
import { Frontend } from '../../common/constants/frontend'
import { getStringAfterSharp } from '../../common/functions/url'
import { selectSpaceTabName, switchSpaceTab } from '../../redux/slice/SpaceSlice'
import { useDispatch } from 'react-redux'
import FactCheckIcon from '@mui/icons-material/FactCheck'
import EqualizerIcon from '@mui/icons-material/Equalizer'
import AddIcon from '@mui/icons-material/Add'
import { TabContext, TabPanel } from '@mui/lab'
import { SpaceWorklist } from './SpaceWorklist'
import SpaceTabName = Frontend.SpaceTabName
import spaceTabNameList = Frontend.spaceTabNameList

export function SpacePage(): JSX.Element {
    const { userId: userIdString } = useParams()
    const dispatch = useDispatch()
    const localUserId = useAppSelector(selectUserId)
    const currentSpaceTabName = useAppSelector(selectSpaceTabName)

    const userId: number = (() => {
        if (userIdString === undefined) {
            return localUserId || 0
        }

        const parsedUserId = parseInt(userIdString)
        return isNaN(parsedUserId) ? 0 : parsedUserId
    })()

    // When loading the space at the first time, redirect to the corresponding tab.
    useEffect(() => {
        const spaceTabName = getStringAfterSharp(window.location.href) as SpaceTabName
        if (spaceTabNameList.includes(spaceTabName) && currentSpaceTabName !== spaceTabName) {
            dispatch(switchSpaceTab(spaceTabName))
        }
    }, [currentSpaceTabName, dispatch])

    const styles = collectStyles({
        tabsContainer: {
            borderBottom: '1px solid #E5E5E5',
        },
        tab: {
            padding: '0 1em',
            height: '40px !important',
            minHeight: '40px !important',
        },
        tabPanel: {
            padding: { xs: '12px !important' },
        },
    })

    if (userId <= 0) {
        // Incorrect user id given.
        return (
            <Page>
                <Alert severity='error'>
                    Incorrect user id: [ {userId} ].
                </Alert>
            </Page>
        )
    }

    function handleTabChange(event: SyntheticEvent, value: string) {
        dispatch(switchSpaceTab(value as SpaceTabName))
    }

    return (
        <Page>
            <Box sx={styles.tabsContainer}>
                <Tabs
                    value={currentSpaceTabName}
                    onChange={handleTabChange}
                    variant='scrollable'
                    scrollButtons
                >
                    <Tab
                        sx={styles.tab}
                        value={spaceTabNameList[0]}
                        label={'WorkList'}
                        iconPosition='start'
                        icon={<FactCheckIcon sx={{ fontSize: '1.25em' }} />}
                    />

                    <Tab
                        sx={styles.tab}
                        value={spaceTabNameList[1]}
                        label={'Chart'}
                        iconPosition='start'
                        icon={<EqualizerIcon sx={{ fontSize: '1.25em' }} />}
                    />

                    <Tab
                        sx={styles.tab}
                        value={spaceTabNameList[2]}
                        label={'Add'}
                        iconPosition='start'
                        icon={<AddIcon sx={{ fontSize: '1.25em' }} />}
                    />
                </Tabs>
            </Box>

            <TabContext value={currentSpaceTabName}>
                <TabPanel value={spaceTabNameList[0]}>
                    <SpaceWorklist />
                </TabPanel>

                <TabPanel value={spaceTabNameList[1]}>
                    Item Two
                </TabPanel>

                <TabPanel value={spaceTabNameList[2]}>
                    Item Three
                </TabPanel>
            </TabContext>
        </Page>
    )
}