import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import './index.css'
import App from './App'
import { ModalProvider } from './context/Modal'
import configureStore from './store'
import TimeProvider from './context/TimeContext'
import SidebarProvider from './context/SidebarContext'
import ViewportProvider from './context/ViewportContext'

const store = configureStore()

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ViewportProvider>
        <SidebarProvider>
          <ModalProvider>
            <TimeProvider>
              <App />
            </TimeProvider>
          </ModalProvider>
        </SidebarProvider>
      </ViewportProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
)
