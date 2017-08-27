import React from 'react';

import {Link} from 'react-router-dom';

import './index.less';

const Home = () => (
  <div>
    <ul className="home-ul">
      <li><Link to="/user-hw/profile/edit/1">资料卡[done]</Link></li>
      <li><Link to="/user-hw/activity/list/1">活动列表[done]</Link></li>
      <li><Link to="/user-hw/activity/join/2">参加活动[done]</Link></li>
      <li><Link to="/user-hw/list/share/1">游记[done]</Link></li>
      <li><Link to="/user-hw/list/share">精彩分享[in]</Link></li>
      <li><Link to="/user-hw/list/month_star">每月一星[in]</Link></li>

      <li><Link to="/user-hw/trail/list">地接列表</Link></li>
      <li><Link to="/user-hw/trail/detail">地接详情</Link></li>
    </ul>
  </div>
);

export default Home;
