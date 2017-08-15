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
  ActivityJoin,
} from './modules';
import './styles/index.less';

const App = () => (
  <div>
    <Route exact path="/user-hw/" component={Home} />
    <Route exact path="/user-hw/profile/edit/:user_id" component={ProfileEditor} />

    <Route exact path="/user-hw/activity/list/:admin_id" component={ActivityList} />
    <Route exact path="/user-hw/activity/join/:activity_id" component={ActivityJoin} />

    <Route exact path="/user-hw/trail/list" component={List} />
    <Route exact path="/user-hw/trail/detail" component={TrailDetail} />

    <Route exact path="/user-hw/list" component={TrailList} />
  </div>
);

export default App;
