import React, { Component } from 'react';

import './index.less';

class TrailDetail extends Component {

  render() {
    return (
      <div className="trail-detail">
        <div className="profile-info">
          <div className="avatar">
            <img src="http://img.kan300.com/userup/1312/16125JVW1.jpg" alt="" />
          </div>
          <div className="info">
            <div className="name">张三</div>
            <div className="phone">13262664172</div>
            <div className="address">浙江临安市的一个小村庄</div>
          </div>
        </div>
        <div className="trail-info">
          <div className="info-block">
            <span className="name">类型：</span><span className="value">农家乐</span>
          </div>
          <div className="info-block">
            <span className="name">路线：</span><span className="value">三尖</span>
          </div>
          <div className="info-block">
            <span className="name">服务详情：</span>
          </div>
          <div className="detail-content">这是一块服务详情的内容占位。这是一块服务详情的内容占位。这是一块服务详情的内容占位。这是一块服务详情的内容占位。这是一块服务详情的内容占位。</div>
          <div className="info-block">
            <span className="name">评论：</span>
          </div>
          <div className="comment">
            <div className="avatar">
              <img src="http://img.kan300.com/userup/1312/16125JVW1.jpg" alt="" />
            </div>
            <div className="content">
              <div className="author-info">
                <span>张三</span>
                <span>06-28 16:30</span>
              </div>
              <div className="text">
                这歌老板的阿斯顿利卡得利卡岁的卢卡斯了打开拉萨打开；拉斯达克；拉萨。
              </div>
            </div>
          </div>
          <div className="comment">
            <div className="avatar">
              <img src="http://img.kan300.com/userup/1312/16125JVW1.jpg" alt="" />
            </div>
            <div className="content">
              <div className="author-info">
                <span>张三</span>
                <span>06-28 16:30</span>
              </div>
              <div className="text">
                这歌老板的阿斯顿利卡得利卡岁的卢卡斯了打开拉萨打开；拉斯达克；拉萨。
              </div>
            </div>
          </div>
        </div>
      </div>);
  }
}

export default TrailDetail;
