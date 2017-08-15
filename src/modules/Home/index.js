import React from 'react';

import {Link} from 'react-router-dom';

import './index.less';

const Home = () => (
    <div>
      <ul className='home-ul'>
        <li><Link to="/user-hw/profile/edit/1">填写保单</Link></li>
        
        
        <li><Link to="/user-hw/activity/list/1">活动列表[done]</Link></li>
        <li><Link to="/user-hw/activity/join/2">参加活动[done]</Link></li>
        
        <li><Link to="/user-hw/trail/list">地接列表</Link></li>
        <li><Link to="/user-hw/trail/detail">地接详情</Link></li>

        <li><Link to="/user-hw/list">不知道什么页面</Link></li>
        
      </ul>
    </div>
);

export default Home;
