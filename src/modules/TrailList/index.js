import React, { Component } from 'react';
import Trail from './Trail';

import './index.less';

class TrailList extends Component {

  render() {
    return (
      <div className="trail-list">
        <div className="head-img">
          <img src="http://58pic.ooopic.com/58pic/12/81/90/27v58PICbU9.jpg" alt="" />
        </div>
        <div className="trails-wrapper">
          <Trail />
        </div>
      </div>);
  }
}

export default TrailList;
