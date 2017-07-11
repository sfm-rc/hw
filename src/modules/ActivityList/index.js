import React, { Component } from 'react';
import Activity from './Activity';
import './index.less';

class ActivityList extends Component {

  render() {
    return (
      <div className="hw-activity-list">
        <div className="head-img">
          <img src="http://img.taopic.com/uploads/allimg/140620/240509-1406200K30138.jpg" alt="" />
        </div>
        <div className="trails-wrapper">
          <Activity />
        </div>
      </div>
    );
  }
}

export default ActivityList;
