import React, { FunctionComponent } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Home } from './Home'
import { About } from './About'

export const SupervisorRouter: FunctionComponent = () => {
    return <BrowserRouter basename='/supervisor'>
        <Routes>
            <Route path='/' element={<Home />} />
            {/*<Route path='/sign-in' element={<SignIn />} />*/}
            <Route path='/about' element={<About />} />
            {/*<Route path='/space/:userId' element={<Space />} />*/}
        </Routes>
    </BrowserRouter>
}