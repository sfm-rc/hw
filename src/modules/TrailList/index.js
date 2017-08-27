import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { ActivityIndicator } from 'antd-mobile';
import Trail from './Trail';
import * as actionCreators from './action';

import './index.less';
@connect(state => ({
  TravelNoteViewer: state.TravelNoteViewer,
}),
  dispatch => bindActionCreators(actionCreators, dispatch),
)
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


  static propTypes = {
    TravelNoteViewer: PropTypes.object,
    getTravelNotes: PropTypes.func,
    match: PropTypes.object,
  }

  state = {
    pageIndex: 1,
    travelNotes: [],
    animating: true,
    hasMore: false,
  }

  componentWillMount() {
    const pageIndex = this.state.pageIndex;
    const params = this.props.match.params;
    const postData = { type: params.type, admin_id: params.admin_id, pageIndex, limit: 10 };
    this.props.getTravelNotes(postData).then((response) => {
      let { travelNotes } = this.state;
      const data = response.resolved.data;
      const list = data.data;
      travelNotes = travelNotes.concat(list);
      this.setState({ travelNotes,
        animating: false,
        hasMore: data.pagination.pageCount > 1,
        pageIndex: pageIndex + 1 });
    });
  }

  showMore = () => {
    this.setState({ animating: true });
    const pageIndex = this.state.pageIndex;
    const params = this.props.match.params;
    const postData = { type: params.type, admin_id: params.admin_id, pageIndex, limit: 10 };
    this.props.getTravelNotes(postData).then((response) => {
      let { travelNotes } = this.state;
      const data = response.resolved.data;
      const list = data.data;
      travelNotes = travelNotes.concat(list);
      this.setState({ travelNotes,
        animating: false,
        hasMore: data.pagination.pageCount > pageIndex,
        pageIndex: pageIndex + 1 });
    });
  }

  render() {
    const { travelNotes, animating, hasMore } = this.state;
    return (
      <div className="trail-list">
        <ActivityIndicator
          toast
          text="数据加载中"
          animating={animating}
          />
        <div className="head-img">
          <img src="http://58pic.ooopic.com/58pic/12/81/90/27v58PICbU9.jpg" alt="" />
        </div>
        <div className="trails-wrapper">
          {travelNotes.map(a => (<Trail travelNote={a} key={a.id} />))}
        </div>
        { hasMore ? (<div className="show-more-btn" onClick={this.showMore}>点击加载更多</div>) : null }
      </div>);
  }
}

export default TrailList;
