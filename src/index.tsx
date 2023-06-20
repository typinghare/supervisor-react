import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { store } from './redux/store'
import { App } from './components/App'
import { Provider } from 'react-redux'
import { CookiesProvider } from 'react-cookie'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)

// This application apply Redux to manage global states and contents.
// Register all providers here.
root.render(
    <React.StrictMode>
        <Provider store={store}>
            <CookiesProvider>
                <QueryClientProvider client={new QueryClient()}>
                    <App />
                </QueryClientProvider>
            </CookiesProvider>
        </Provider>
    </React.StrictMode>,
)

// Performance logger.
// @link https://bit.ly/CRA-vitals
// Should enable it in the development environment.
// reportWebVitals(console.log)

