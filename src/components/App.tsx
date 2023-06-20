import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Navigation } from './Layout/Navigation'
import { Router } from './Layout/Router'
import { Footer } from './Layout/Footer'
import { SyntheticEvent, useEffect } from 'react'
import { useCookies } from 'react-cookie'
import { Frontend } from '../common/constants/frontend'
import { useDispatch } from 'react-redux'
import { signIn } from '../redux/slice/UserSlice'
import { BottomNavigation, BottomNavigationAction, Paper, useMediaQuery, useTheme } from '@mui/material'
import { collectStyles } from '../common/functions/style'
import { useAppSelector } from '../redux/hooks'
import { selectSpaceTabName, switchSpaceTab } from '../redux/slice/SpaceSlice'
import { indexOf } from 'lodash'
import FactCheckIcon from '@mui/icons-material/FactCheck'
import EqualizerIcon from '@mui/icons-material/Equalizer'
import AddIcon from '@mui/icons-material/Add'
import ControlCameraIcon from '@mui/icons-material/ControlCamera'
import CookieKey = Frontend.CookieKey
import spaceTabNameList = Frontend.spaceTabNameList

export const bottomNavigationHeight = '56px'

export function App(): JSX.Element {
    const dispatch = useDispatch()
    const [cookies] = useCookies([CookieKey.UserId, CookieKey.Token, CookieKey.Username])

    useEffect(() => {
        const userId = cookies[CookieKey.UserId]
        const token = cookies[CookieKey.Token]
        const username = cookies[CookieKey.Username]
        if (userId !== undefined) {
            dispatch(signIn({ userId, token, username }))
        }
    }, []) // eslint-disable-line

    const theme = useTheme()
    const isSmallDevice = useMediaQuery(theme.breakpoints.down('sm'))

    return (
        <QueryClientProvider client={new QueryClient()}>
            {isSmallDevice && <SmallDeviceAppContent />}

            {!isSmallDevice && <LargeDeviceAppContent />}
        </QueryClientProvider>
    )
}

function SmallDeviceAppContent(): JSX.Element {


    const dispatch = useDispatch()
    const currentSpaceTabName = useAppSelector(selectSpaceTabName)

    const styles = collectStyles({
        bottomNavigation: {
            position: 'fixed',
            bottom: 0,
            left: 0,
            right: 0,
            height: bottomNavigationHeight
        },
    })

    function handleSpaceTabChange(event: SyntheticEvent, value: number) {
        dispatch(switchSpaceTab(spaceTabNameList[value]))
    }

    return (
        <>
            <Navigation />
            <Router />
            <Paper sx={styles.bottomNavigation} elevation={3}>
                <BottomNavigation
                    showLabels
                    value={indexOf(spaceTabNameList, currentSpaceTabName)}
                    onChange={handleSpaceTabChange}
                >
                    <BottomNavigationAction
                        label='Worklist'
                        icon={<FactCheckIcon />}
                    />
                    <BottomNavigationAction
                        label='Chart'
                        icon={<EqualizerIcon />}
                    />
                    <BottomNavigationAction
                        label='New'
                        icon={<AddIcon />}
                    />

                    <BottomNavigationAction
                        label='Control'
                        icon={<ControlCameraIcon />}
                    />
                </BottomNavigation>
            </Paper>
        </>
    )
}

function LargeDeviceAppContent(): JSX.Element {
    return (
        <>
            <Navigation />

            <>
                <Router />
                <Footer />
            </>
        </>
    )
}