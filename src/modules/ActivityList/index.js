import React, { Component } from 'react';
import Activity from './Activity';
import './index.less';

class ActivityList extends Component {

  render() {
    return (
      <div className="hw-activity-list">
        <div className="head-img">
          <img src="http://58pic.ooopic.com/58pic/12/81/90/27v58PICbU9.jpg" alt="" />
        </div>
        <div className="trails-wrapper">
          <Activity />
        </div>
      </div>
    );
  }
}

export default ActivityList;
