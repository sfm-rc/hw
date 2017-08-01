import React from 'react';
import PropTypes from 'prop-types';

import './index.less';

const defaultProps = {
  activity: {},
};

const propTypes = {
  activity: PropTypes.object,
};

const Activity = ({ activity } = defaultProps) => (
  <div className="activity-trail">
    <div className="img">
      <img src={activity.image_url} alt="" />
    </div>
    <div className="clear" />
    <div className="details">
      <div className="title">{activity.title}</div>
      <div className="end-date">截止时间：{activity.end_time}</div>
      <div className="infos">
        <span className="price">￥{activity.price}/人</span>
        <span className="people">45/{activity.limit_num}人</span>
      </div>
      <div className="status-btn">报名</div>
    </div>
  </div>
);

Activity.defaultProps = defaultProps;
Activity.propTypes = propTypes;

export default Activity;
