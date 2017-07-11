import { combineReducers } from 'redux';
import createReducer from './createReducer';

const reducer = combineReducers({
  test: createReducer('test'),
});

export default reducer;
