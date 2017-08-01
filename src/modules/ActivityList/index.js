import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { ActivityIndicator } from 'antd-mobile';
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

  state = {
    pageIndex: 1,
    activities: [],
    animating: true,
    hasMore: false,
  }

  componentWillMount() {
    const pageIndex = this.state.pageIndex;
    this.props.getActivities({ admin_id: '1', pageIndex, limit: 10 }).then((response) => {
      let { activities } = this.state;
      const data = response.resolved.data;
      const list = data.data;
      activities = activities.concat(list);
      this.setState({ activities,
        animating: false,
        hasMore: data.pagination.pageCount > 1,
        pageIndex: pageIndex + 1 });
    });
  }

  showMore = () => {
    this.setState({ animating: true });
    const pageIndex = this.state.pageIndex;
    this.props.getActivities({ admin_id: '1', pageIndex, limit: 10 }).then((response) => {
      let { activities } = this.state;
      const data = response.resolved.data;
      const list = data.data;
      activities = activities.concat(list);
      this.setState({ activities,
        animating: false,
        hasMore: data.pagination.pageCount > pageIndex,
        pageIndex: pageIndex + 1 });
    });
  }

  render() {
    const { activities, animating, hasMore } = this.state;
    return (
      <div className="hw-activity-list">
        <ActivityIndicator
          toast
          text="数据加载中"
          animating={animating}
          />
        <div className="head-img">
          <img src="http://58pic.ooopic.com/58pic/12/81/90/27v58PICbU9.jpg" alt="" />
        </div>
        <div className="trails-wrapper">
          {activities.map(a => (<Activity activity={a} key={a.id} />))}
        </div>
        { hasMore ? (<div className="show-more-btn" onClick={this.showMore}>点击加载更多</div>) : null }
      </div>
    );
  }
}

export default ActivityList;
