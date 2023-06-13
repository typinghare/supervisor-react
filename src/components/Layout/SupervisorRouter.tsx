import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { HomePage } from '../HomePage'
import { AboutPage } from '../About/AboutPage'
import { SpacePage } from '../SpacePage'
import { SignInPage } from '../SignInPage'
import { Frontend, Url } from '../../common/constant'

/**
 * Supervisor router.
 * @constructor
 */
export const SupervisorRouter = function(): JSX.Element {
    return (
        <BrowserRouter basename={Frontend.Basename}>
            <Routes>
                <Route path={Url.Home} element={<HomePage />} />
                <Route path={Url.SignIn} element={<SignInPage />} />
                <Route path={Url.About} element={<AboutPage />} />
                <Route path={Url.Space} element={<SpacePage />} />
                <Route path={`${Url.Space}/:userId`} element={<SpacePage />} />
            </Routes>
        </BrowserRouter>
    )
}