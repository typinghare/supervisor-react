import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { store } from './redux/store'
import { App } from './components/App'
import { Provider } from 'react-redux'
import reportWebVitals from './reportWebVitals'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)

// This application apply Redux to manage global states and contents.
root.render(
    <React.StrictMode>
        <Provider
            store={store}
            children={<App />}
        />
    </React.StrictMode>,
)

// Performance logger.
// @link https://bit.ly/CRA-vitals
reportWebVitals(console.log)

