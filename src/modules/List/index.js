import React, { Component } from 'react';
import { SearchBar } from 'antd-mobile';
import Activity from './Activity';

import './index.less';

class List extends Component {

  state = {
    searchValue: '',
    showCancelButton: false,
  }

  onSubmit = (value) => {
    console.log('value:', value);
  }

  onCancel = () => {
    this.setState({ showCancelButton: false, searchValue: '' });
  }

  onChange = (value) => {
    this.setState({ searchValue: value });
  }

  onClear = () => {
    this.setState({ searchValue: '' });
  }

  renderActivities = activities => (activities.map(a => (<Activity data={a} key={a.id} />)));

  render() {
    const activities = [{ id: 1 }, { id: 2 }, { id: 3 }];
    const { searchValue, showCancelButton } = this.state;

    return (
      <div className="hw-list">
        <div className="search-bar-wrapper">
          <SearchBar
            placeholder="请输入路线或城市"
            value={searchValue}
            onChange={this.onChange}
            onSubmit={this.onSubmit}
            onCancel={this.onCancel}
            onClear={this.onClear}
            showCancelButton={showCancelButton}
            />
        </div>
        <div className="activity-wrapper">
          {this.renderActivities(activities)}
        </div>
      </div>);
  }
}

export default List;
