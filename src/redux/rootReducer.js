import { combineReducers } from 'redux';
import createReducer from './createReducer';

const reducer = combineReducers({
  ActivityListViewer: createReducer('GET_ACTIVITY_LIST'),
  ActivityJoinViewer: createReducer('GET_ACTIVITY'),
  TravelNoteViewer: createReducer('GET_TRAIL_LIST'),
});

export default reducer;
