import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { createStore } from "redux";
import { Provider } from 'react-redux';
import rootReucers from './store/reducer/index';

const store = createStore(rootReucers);
ReactDOM.render(
  <Provider store={store}>
    <App />
    </Provider>,
    document.getElementById("root")
);