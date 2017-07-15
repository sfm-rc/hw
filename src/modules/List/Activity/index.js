import React, { Component, PropTypes } from 'react';

import './index.less';

class Activity extends Component {

  static propTypes = {
    data: PropTypes.objet,
  }

  render() {
    return (<div className="ft-activity">
      <div className="img-wrapper">
        <img src="http://58pic.ooopic.com/58pic/12/81/90/27v58PICbU9.jpg" alt="" />
      </div>
      <div className="content">
        <div className="type">
          <span className="info">类型：农家乐</span>
          <span className="trail-name">路线：七尖</span>
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
