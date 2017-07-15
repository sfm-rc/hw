import React, { Component } from 'react';
import { InputItem, Picker, List, DatePicker, Button, NavBar, Icon } from 'antd-mobile';
import moment from 'moment';

import './index.less';

class ProfileEditor extends Component {

  state = {
    certifications: [{ value: '1', label: '身份证' }, { value: '0', label: '护照' }],
    credentialValue: ['1'],
    sexOptions: [{ value: '1', label: '男' }, { value: '0', label: '女' }],
    sexValue: ['1'],
    name: '',
  }

  onNameChange =(value) => {
    this.setState({ name: value });
  }

  render() {
    const maxDate = moment('2016-12-03 +0800', 'YYYY-MM-DD Z').utcOffset(8);
    const minDate = moment('2015-08-06 +0800', 'YYYY-MM-DD Z').utcOffset(8);

    const { name, certifications, credentialValue, sexOptions, sexValue } = this.state;
    return (
      <div className="hw-profile-editor">
        <NavBar iconName="left" mode="light" onLeftClick={() => { window.history.go(-1); }}>个人资料卡</NavBar>
        <div className="title">被保人信息</div>
        <InputItem value={name} onChange={this.onNameChange}>姓名</InputItem>
        <Picker
          data={certifications}
          cols={1}
          className="forss"
          value={credentialValue}
          onChange={v => this.setState({ credentialValue: v })}>
          <List.Item arrow="horizontal">证件类型</List.Item>
        </Picker>
        <InputItem>证件号码</InputItem>
        <Picker
          data={sexOptions}
          cols={1} className="forss" value={sexValue} onChange={v => this.setState({ sexValue: v })}>
          <List.Item arrow="horizontal">性别</List.Item>
        </Picker>
        <DatePicker
          mode="date"
          title="选择日期"
          extra="请选择"
          minDate={minDate}
          maxDate={maxDate}>
          <List.Item arrow="horizontal">出生日期</List.Item>
        </DatePicker>
        <InputItem type="phone">手机号码</InputItem>
        <InputItem>紧急联系人</InputItem>
        <InputItem type="phone">联系人号码</InputItem>
        <div className="btn-wrapper">
          <Button type="primary" size="large">提交</Button>
        </div>
      </div>);
  }
}

export default ProfileEditor;
