import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import './index.css';
import App from './App';
import { ModalProvider } from './context/Modal';
import configureStore from './store';
import ToggleAlarmlistProvider from './context/ToggleAlarmlist';

const store = configureStore();

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ModalProvider>
        <ToggleAlarmlistProvider>
          <App />
        </ToggleAlarmlistProvider>
      </ModalProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
