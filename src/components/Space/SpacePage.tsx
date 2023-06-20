import { Page } from '../Common/Page'
import { Alert, useMediaQuery, useTheme } from '@mui/material'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { useAppSelector } from '../../redux/hooks'
import { selectUserId } from '../../redux/slice/UserSlice'
import { useEffect } from 'react'
import { collectStyles } from '../../common/functions/style'
import { Frontend } from '../../common/constants/frontend'
import { getStringAfterSharp } from '../../common/functions/url'
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
import SpaceTabName = Frontend.SpaceTabName
import spaceTabNameList = Frontend.spaceTabNameList


export function SpacePage(): JSX.Element {
    const { userId: userIdString } = useParams()
    const dispatch = useDispatch()
    const localUserId = useAppSelector(selectUserId)
    const currentSpaceTabName = useAppSelector(selectSpaceTabName)
    const navigate = useNavigate()
    const location = useLocation()
    const theme = useTheme()
    const isSmallDevice = useMediaQuery(theme.breakpoints.down('sm'))

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
    })

    function handleTabChange(value: string) {
        dispatch(switchSpaceTab(value as SpaceTabName))
        navigate(location.pathname + '#' + value)
    }

    return (
        <Page>
            {!isSmallDevice && (
                <TabList
                    value={currentSpaceTabName}
                    valueList={spaceTabNameList}
                    labelList={['Worklist', 'Chart', 'New', 'Control']}
                    onValueChange={handleTabChange}
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
                    <ChartPanel />
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
        </Page>
    )
}