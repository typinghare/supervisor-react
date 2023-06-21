import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Frontend } from '../../common/constants/frontend'
import { AboutPage } from '../About/AboutPage'
import { HomePage } from '../HomePage'
import { SignInPage } from '../User/SignInPage'
import { SpacePage } from '../Space/SpacePage'

/**
 * Supervisor router. Developers register routers in this component.
 */
export function Router(): JSX.Element {
    return (
        <BrowserRouter basename={Frontend.Basename}>
            <Routes>
                <Route path={Frontend.Url.Home} element={<HomePage />} />
                <Route path={Frontend.Url.About} element={<AboutPage />} />
                <Route path={Frontend.Url.SignIn} element={<SignInPage />} />
                <Route path={Frontend.Url.Space} element={<SpacePage />} />
                <Route path={`${Frontend.Url.Space}/:userId`} element={<SpacePage />} />
            </Routes>
        </BrowserRouter>
    )
}