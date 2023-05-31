/** @format */

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

import './style.scss';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import rootReducer from './store/reducers/rootReducer';

const reduxStore = createStore(rootReducer);
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
   <React.StrictMode>
      <Provider store={reduxStore}>
         <App />
      </Provider>
   </React.StrictMode>,
);
