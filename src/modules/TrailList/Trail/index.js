import React from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';

import './index.less';

const defaultProps = {
  activity: {},
};

const propTypes = {
  activity: PropTypes.object,
};

const Trail = ({ travelNote } = defaultProps) => (
  <div className="trail">
    <a href={travelNote.link_url}>
      <div className="img">
        <img src={travelNote.image_url} alt="" />
      </div>
      <div className="clear" />
      <div className="details">
        <div className="title">{travelNote.title}</div>
        <div className="end-date">活动时间：{moment.unix(travelNote.start_date).format('YYYY-MM-DD')}</div>
        <div className="infos">
          <span className="author">作者：{travelNote.author}</span>
          <span className="view">{travelNote.view_count}人</span>
        </div>
      </div>
    </a>
  </div>
);

Trail.defaultProps = defaultProps;
Trail.propTypes = propTypes;

export default Trail;
