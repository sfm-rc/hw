import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import Activity from './Activity';
import './index.less';
import * as actionCreators from './action';

@connect(state => ({
  ActivityListViewer: state.ActivityListViewer,
}),
  dispatch => bindActionCreators(actionCreators, dispatch),
)
class ActivityList extends Component {

  static propTypes = {
    ActivityListViewer: PropTypes.object,
    getActivities: PropTypes.func,
  }

  componentWillMount() {
    this.props.getActivities({
"admin_id":"1",
"pageIndex": 1,
"limit": 10
});
  }

  render() {
    return (
      <div className="hw-activity-list">
        <div className="head-img">
          <img src="http://58pic.ooopic.com/58pic/12/81/90/27v58PICbU9.jpg" alt="" />
        </div>
        <div className="trails-wrapper">
          <Activity />
        </div>
      </div>
    );
  }
}

export default ActivityList;
