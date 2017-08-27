import React, { Component } from 'react';
import Trail from './Trail';

import './index.less';

class TrailList extends Component {
    constructor(props){
        super(props);
        const type = this.props.match.params.type;
        if(type=='share'){
            window.document.title = '精彩分享';
        }
        if(type=='month_star'){
            window.document.title = '每月一星';
        }
    }


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
