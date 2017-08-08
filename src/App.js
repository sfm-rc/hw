import React from 'react';
import {
  Route,
} from 'react-router';
import {
  Home,
  List,
  ProfileEditor,
  ActivityList,
  TrailList,
  TrailDetail,
  ActivityJoin
} from './modules';
import './styles/index.less';

const App = () => (
  <div>
    <Route exact path="/" component={Home} />
    <Route exact path="/list" component={List} />
    <Route exact path="/profile/edit" component={ProfileEditor} />
    <Route exact path="/trail/list" component={TrailList} />
    <Route exact path="/trail/detail" component={TrailDetail} />
    <Route exact path="/activity/list/:admin_id" component={ActivityList} />
    <Route exact path="/activity/join/:activity_id" component={ActivityJoin} />
  </div>
);

export default App;
