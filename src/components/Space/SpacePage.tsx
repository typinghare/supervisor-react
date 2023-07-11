import { Page } from '../Common/Page'
import { Alert, BottomNavigation, BottomNavigationAction, Paper } from '@mui/material'
import { useParams } from 'react-router-dom'
import { useAppSelector } from '../../redux/hooks'
import { selectUserId } from '../../redux/slice/UserSlice'
import { SyntheticEvent, useEffect } from 'react'
import { collectStyles } from '../../common/functions/style'
import { Frontend } from '../../common/constants/frontend'
import { selectSpaceTabName, switchSpaceTab } from '../../redux/slice/SpaceSlice'
import { useDispatch } from 'react-redux'
import FactCheckIcon from '@mui/icons-material/FactCheck'
import EqualizerIcon from '@mui/icons-material/Equalizer'
import AddIcon from '@mui/icons-material/Add'
import ControlCameraIcon from '@mui/icons-material/ControlCamera'
import { TabContext, TabPanel } from '@mui/lab'
import { WorklistPanel } from './WorklistPanel/WorklistPanel'
import { ChartPanel } from './ChartPanel/ChartPanel'
import { NewPanel } from './NewPanel/NewPanel'
import { ControlPanel } from './ControlPanel/ControlPanel'
import { TabList } from '../Common/Tab/TabList'
import { indexOf } from 'lodash'
import { bottomNavigationHeight } from '../App'
import useDeviceSize, { DeviceSize } from '../../hook/useDeviceSize'
import { useLocation } from '../../hook/useLocation'
import SpaceTabName = Frontend.SpaceTabName
import spaceTabNameList = Frontend.spaceTabNameList

export function SpacePage(): JSX.Element {
    const { userId: userIdString } = useParams()
    const dispatch = useDispatch()
    const localUserId = useAppSelector(selectUserId)
    const currentSpaceTabName = useAppSelector(selectSpaceTabName)
    const { setQueryParams, queryParams } = useLocation()
    const isSmallDevice = useDeviceSize() === DeviceSize.Small

    const userId: number = (() => {
        if (userIdString === undefined) {
            return localUserId || 0
        }

        const parsedUserId = parseInt(userIdString)
        return isNaN(parsedUserId) ? 0 : parsedUserId
    })()

    // When loading the space at the first time, redirect to the corresponding tab.
    useEffect(() => {
        const spaceTabName = queryParams.get(Frontend.QueryKey.Tab) as SpaceTabName
        if (spaceTabNameList.includes(spaceTabName) && currentSpaceTabName !== spaceTabName) {
            dispatch(switchSpaceTab(spaceTabName))
        }
    }, []) // eslint-disable-line react-hooks/exhaustive-deps

    if (userId <= 0) {
        return (
            <Page>
                <Alert severity='error'>
                    Please Login first.
                </Alert>
            </Page>
        )
    }

    const styles = collectStyles({
        root: {
            backgroundColor: '#e7ecef',
        },
        tabsContainer: {
            '& .MuiTabs-scroller': {
                borderBottom: '1px solid #E5E5E5',
            },
        },
        tab: {
            padding: '0 1em',
            height: '40px !important',
            minHeight: '40px !important',
        },
        tabPanel: {
            padding: {
                xs: '0.5em !important',
                md: '1em !important',
            },
        },
        bottomNavigation: {
            position: 'fixed',
            bottom: 0,
            left: 0,
            right: 0,
            height: bottomNavigationHeight,
        },
    })

    function handleSpaceTabChange(value: string) {
        dispatch(switchSpaceTab(value as SpaceTabName))
        setQueryParams({
            [Frontend.QueryKey.Tab]: value,
        })
    }

    function handleBottomNavigationSpaceTabChange(event: SyntheticEvent, value: number) {
        handleSpaceTabChange(spaceTabNameList[value])
    }

    return (
        <Page sx={styles.root}>
            {!isSmallDevice && (
                <TabList
                    value={currentSpaceTabName}
                    valueList={spaceTabNameList}
                    labelList={['Worklist', 'Chart', 'New', 'Control']}
                    onValueChange={handleSpaceTabChange}
                >
                    <FactCheckIcon />
                    <EqualizerIcon />
                    {userId === localUserId ? <AddIcon /> : undefined}
                    {userId === localUserId ? <ControlCameraIcon /> : undefined}
                </TabList>
            )}

            <TabContext value={currentSpaceTabName}>
                <TabPanel
                    value={spaceTabNameList[0]}
                    sx={styles.tabPanel}
                >
                    <WorklistPanel userId={userId} />
                </TabPanel>

                <TabPanel
                    value={spaceTabNameList[1]}
                    sx={styles.tabPanel}
                >
                    <ChartPanel userId={userId} />
                </TabPanel>

                {userId === localUserId && (
                    <TabPanel
                        value={spaceTabNameList[2]}
                        sx={styles.tabPanel}
                    >
                        <NewPanel />
                    </TabPanel>
                )}

                {userId === localUserId && (
                    <TabPanel
                        value={spaceTabNameList[3]}
                        sx={styles.tabPanel}
                    >
                        <ControlPanel />
                    </TabPanel>
                )}
            </TabContext>

            {isSmallDevice && (
                <Paper sx={styles.bottomNavigation} elevation={3}>
                    <BottomNavigation
                        showLabels
                        value={indexOf(spaceTabNameList, currentSpaceTabName)}
                        onChange={handleBottomNavigationSpaceTabChange}
                    >
                        <BottomNavigationAction
                            label='Worklist'
                            icon={<FactCheckIcon />}
                        />

                        <BottomNavigationAction
                            label='Chart'
                            icon={<EqualizerIcon />}
                        />

                        {userId === localUserId && (
                            <BottomNavigationAction
                                label='New'
                                icon={<AddIcon />}
                            />
                        )}

                        {userId === localUserId && (
                            <BottomNavigationAction
                                label='Control'
                                icon={<ControlCameraIcon />}
                            />
                        )}
                    </BottomNavigation>
                </Paper>
            )}
        </Page>
    )
}