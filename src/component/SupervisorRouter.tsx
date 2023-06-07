import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { HomePage } from './HomePage'
import { AboutPage } from './AboutPage'
import { SpacePage } from './SpacePage'
import { SignInPage } from './SignInPage'
import { BASE_URL } from '../common/constant'

/**
 * Supervisor router.
 * @constructor
 */
export const SupervisorRouter: React.FC = (): JSX.Element => {
    return <BrowserRouter basename={BASE_URL}>
        <Routes>
            <Route path='/' element={<HomePage />} />
            <Route path='/sign-in' element={<SignInPage />} />
            <Route path='/about' element={<AboutPage />} />
            <Route path='/space/:userId' element={<SpacePage />} />
            <Route path='/space' element={<SpacePage />} />
        </Routes>
    </BrowserRouter>
}