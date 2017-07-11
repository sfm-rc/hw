import React, { Component, PropTypes } from 'react';

import './index.less';

class Activity extends Component {

  static propTypes = {
    data: PropTypes.objet,
  }

  render() {
    return (<div className="ft-activity">
      <div className="img-wrapper">
        <img src="http://img.taopic.com/uploads/allimg/140620/240509-1406200K30138.jpg" alt="" />
      </div>
      <div className="content">
        <div className="type">
          <span className="info">类型：农家乐</span>
          <span className="trail">路线：七尖</span>
        </div>
        <div className="contact">刘老板 1336666666</div>
        <div className="infos">
          <div className="info">
            <span className="icon view" />
            <span className="value">1000</span>
          </div>
          <div className="info">
            <span className="icon upvote" />
            <span className="value">1000</span>
          </div>
          <div className="info">
            <span className="icon comment" />
            <span className="value">1000</span>
          </div>
        </div>
      </div>
    </div>);
  }
}

export default Activity;
