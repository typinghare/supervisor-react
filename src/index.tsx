import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { store } from './redux/store'
import { App } from './components/App'
import { Provider } from 'react-redux'
import { CookiesProvider } from 'react-cookie'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { createTheme, ThemeProvider } from '@mui/material'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)

// @link https://coolors.co/palette/8ecae6-219ebc-023047-ffb703-fb8500
// @link https://coolors.co/palette/5aa9e6-7fc8f8-f9f9f9-ffe45e-ff6392
const theme = createTheme({
    palette: {
        primary: {
            main: '#219ebc',
            light: '#219ebc',
        },
        secondary: {
            main: '#F4845F',
            light: '#F4845F',
        },
    },
})

// This application apply Redux to manage global states and contents.
// Register all providers here.
// Providers (from outside to inside): Redux, react-cookies, react-query.
root.render(
    <React.StrictMode>
        <ThemeProvider theme={theme}>
            <Provider store={store}>
                <CookiesProvider>
                    <QueryClientProvider client={new QueryClient()}>
                        <App />
                    </QueryClientProvider>
                </CookiesProvider>
            </Provider>
        </ThemeProvider>
    </React.StrictMode>,
)

// Performance logger.
// @link https://bit.ly/CRA-vitals
// Should enable it in the development environment.
// reportWebVitals(console.log)

