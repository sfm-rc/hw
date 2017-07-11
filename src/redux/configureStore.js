import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import reducer from './rootReducer';
import promise from './middlewares/promise';
import api from './middlewares/api';

const middlewares = [
  thunk,
  api,
  promise(),
].filter(Boolean);

if (__DEV__) { //eslint-disable-line
  middlewares.push(logger);
}

const createStoreWithMiddleware = applyMiddleware(...middlewares)(createStore);

export default function configureStore(initialState) {
  const store = createStoreWithMiddleware(
    reducer,
    initialState,
    window.devToolsExtension && window.devToolsExtension());
  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('./rootReducer', () => {
      const nextRootReducer = reducer.default;
      store.replaceReducer(nextRootReducer);
    });
  }
  return store;
}
