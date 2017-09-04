import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import moment from 'moment';

import './index.less';

const defaultProps = {
  activity: {},
};

const propTypes = {
  activity: PropTypes.object,
};

const statusMap = {
  open: '报名',
  end: '结束',
  full: '满员',
  time_out: '截止',
};

const Activity = ({ activity } = defaultProps) => {
  // open报名, end结束, full满员, time_out截止
  const btnCls = classnames({
    'status-btn': true,
    end: activity.status === 'end',
    full: activity.status === 'full',
    'time-out': activity.status === 'time_out',
  });
  return (
    <div className="activity-trail">
      <a href={activity.link_url}>
        <div className="img">
          <img src={activity.image_url} alt="" />
        </div>
        <div className="clear" />
        <div className="details">
          <div className="title">{activity.title}</div>
          <div className="end-date">截止时间：{moment(activity.end_time, 'X').format('YYYY-MM-DD HH:mm')}</div>
          <div className="infos">
            <span className="price">￥{activity.price / 10.0}元/人</span>
            <span className="people">{activity.cur_num}/{activity.limit_num}人</span>
          </div>
          {
              activity.status === 'open' ?
                <a href={`/user-hw/activity/join/${activity.id}`} className={btnCls}>{statusMap[activity.status]}</a>
                  :
                <div className={btnCls}>{statusMap[activity.status]}</div>
          }
        </div>
      </a>
    </div>
  );
};

Activity.defaultProps = defaultProps;
Activity.propTypes = propTypes;

export default Activity;
