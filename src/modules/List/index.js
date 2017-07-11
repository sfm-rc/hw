import React, { Component } from 'react';
import Activity from './Activity';
import { SearchBar } from '../../components';

import './index.less';

class List extends Component {

  renderActivities = activities => (activities.map(a => (<Activity data={a} key={a.id} />)));

  render() {
    const activities = [{ id: 1 }, { id: 2 }, { id: 3 }];
    return (
      <div className="hw-list">
        <div className="search-bar-wrapper">
          <SearchBar placeholder="请输入路线或城市" />
        </div>
        <div>
          {this.renderActivities(activities)}
        </div>
      </div>);
  }
}

export default List;
