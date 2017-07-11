import axios from 'axios';
import Qs from 'qs';
import { assign, noop } from 'lodash';

axios.defaults = assign(axios.defaults, {
  headers: {
    get: { 'Content-Type': 'application/json, text/plain, */*' },
    patch: { 'Content-Type': 'application/json' },
    post: { 'Content-Type': 'application/json' },
    put: { 'Content-Type': 'application/json' },
  },
  paramsSerializer: params => Qs.stringify(params),
  timeout: 1000 * 60,
  maxRedirects: 3,
});

const apiMiddleware = store => next => (action) => { // eslint-disable-line
  if (action.url) {
    const promise = axios(action);
    return next({
      type: action.type,
      payload: {
        promise,
      },
      success: action.success || noop,
      error: action.error || noop,
    });
  }
  return next(action);
};

export default apiMiddleware;
