import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { store } from './redux/store'
import { App } from './components/App'
import { Provider } from 'react-redux'
import { CookiesProvider } from 'react-cookie'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ThemeProvider } from '@mui/material'
import { theme } from './theme'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)

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

