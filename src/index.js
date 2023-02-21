import React from "react";
import ReactDOM from "react-dom/client";
import {RouterProvider} from "react-router-dom";
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from 'redux-persist'
import {store} from './Redux-store/Store';
import {router} from './Router/Router';
import './Font/Google-font.css';
import './Config/Hospital-config';

let persistor = persistStore(store);
const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
        <RouterProvider router={router} />
        </PersistGate>
      </Provider>
  </ React.StrictMode>
);