import React from 'react';
import {
  Route,
} from 'react-router';
import 'react-select/dist/react-select.css';
import {
  Home,
  List,
  ProfileEditor,
  ActivityList,
  TrailList,
  TrailDetail,
} from './modules';
import './styles/index.less';

const App = () => (
  <div>
    <Route exact path="/" component={Home} />
    <Route exact path="/list" component={List} />
    <Route exact path="/profile/edit" component={ProfileEditor} />
    <Route exact path="/activity/list" component={ActivityList} />
    <Route exact path="/trail/list" component={TrailList} />
    <Route exact path="/trail/detail" component={TrailDetail} />
  </div>
);

export default App;
