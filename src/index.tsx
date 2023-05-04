import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import reportWebVitals from './reportWebVitals'
import { store } from './redux/store'
import { App } from './component/App'
import { Provider } from 'react-redux'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)

root.render(
    <React.StrictMode>
        <Provider store={store}><App /></Provider>
    </React.StrictMode>,
)

// Performance logger. see: https://bit.ly/CRA-vitals
reportWebVitals(console.log)
