import React from 'react';
import ReactDOM from 'react-dom';
import { Router } from 'react-router';
import { Provider } from 'react-redux';
import createBrowserHistory from 'history/createBrowserHistory';
import 'babel-polyfill';
import confgureStore from './redux/configureStore';
import App from './App';
import overrideHistory from './utils/overrideHistory';

const history = overrideHistory(createBrowserHistory({ basename: 'test' }));
const store = confgureStore();

const renderApp = () => {
  ReactDOM.render(
    <Provider store={store}>
      <Router history={history}>
        <App />
      </Router>
    </Provider>,
    document.querySelector('#fantastic-four'));
};

renderApp();
