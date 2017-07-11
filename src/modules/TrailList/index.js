import React, { Component } from 'react';
import Trail from './Trail';

import './index.less';

class TrailList extends Component {

  render() {
    return (
      <div className="trail-list">
        <div className="head-img">
          <img src="http://img.taopic.com/uploads/allimg/140620/240509-1406200K30138.jpg" alt="" />
        </div>
        <div className="trails-wrapper">
          <Trail />
        </div>
      </div>);
  }
}

export default TrailList;
