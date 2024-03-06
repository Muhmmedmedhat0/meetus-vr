import './index.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './container/App';
import { Provider } from 'react-redux';
import { NextUIProvider } from '@nextui-org/react';

import { store } from './app/store';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <NextUIProvider>
      <Provider store={store}>
          <App />
      </Provider>
    </NextUIProvider>
  </React.StrictMode>,
);
