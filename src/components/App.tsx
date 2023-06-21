import { Navigation } from './Layout/Navigation'
import { Router } from './Layout/Router'
import { Footer } from './Layout/Footer'
import useDeviceSize, { DeviceSize } from '../hook/useDeviceSize'
import { AppBootstrap } from './AppBootstrap'

export const bottomNavigationHeight = '56px'

/**
 * The root component of the application.
 */
export function App(): JSX.Element {
    return (
        <>
            <AppBootstrap />
            <Navigation />
            <>
                <Router />
                {useDeviceSize() !== DeviceSize.Small && <Footer />}
            </>
        </>
    )
}