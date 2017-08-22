import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { InputItem, Picker, List, DatePicker, Button, NavBar, Toast } from 'antd-mobile';
import moment from 'moment';
import * as actionCreators from '../action';

import './index.less';

@connect(state => ({
  ProfileViewer: state.ProfileViewer,
}),
  dispatch => bindActionCreators(actionCreators, dispatch),
)
class ProfileEditor extends Component {

  static propTypes = {
    ProfileViewer: PropTypes.object,
    saveProfile: PropTypes.func,
    match: PropTypes.object,
  }

  state = {
    certifications: [{ value: 'id_card', label: '身份证' }, { value: 'passport', label: '护照' }],
    credentialValue: ['id_card'],
    sexOptions: [{ value: '1', label: '男' }, { value: '0', label: '女' }],
    sexValue: ['1'],
    name: '',
    certification: '',
    phone: '',
    birth: '',
    contact: '',
    contactPhone: '',
    minDate: moment('1949-10-01 +0800', 'YYYY-MM-DD Z'),
    maxDate: moment('2017-01-01 +0800', 'YYYY-MM-DD Z'),
  }

  onNameChange = (name) => {
    this.setState({ name });
  }

  onCertificationChange = (certification) => {
    this.setState({ certification });
  }

  onPhoneChange = (phone) => {
    this.setState({ phone });
  }

  onContactChange = (contact) => {
    this.setState({ contact });
  }

  onContactPhoneChange = (contactPhone) => {
    this.setState({ contactPhone });
  }

  onSubmit = () => {
    Toast.loading('保存中...', 1000);
    const { name, credentialValue, certification,
      sexValue, phone, contact, contactPhone } = this.state;
    const data = {
      activity_id: this.props.match.params.activity_id,
      user_name: name,
      cer_type: credentialValue[0],
      cer_id: certification,
      sex: sexValue[0],
      birth: '',
      mobile: phone,
      e_contact: contact,
      e_contact_mobile: contactPhone,
    };
    console.log(data);
    this.props.saveProfile(data).then(() => {
      Toast.hide();
    });
  }

  render() {
    const { name, certifications, credentialValue, birth,
      certification, phone, contact, contactPhone,
      sexOptions, sexValue, minDate, maxDate } = this.state;
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
        <InputItem value={certification} onChange={this.onCertificationChange}>证件号码</InputItem>
        <Picker
          data={sexOptions}
          cols={1} className="forss" value={sexValue} onChange={v => this.setState({ sexValue: v })}>
          <List.Item arrow="horizontal">性别</List.Item>
        </Picker>
        <DatePicker
          mode="date"
          title="选择日期"
          extra="请选择"
          value={birth}
          onChange={v => this.setState({ birth: v })}
          minDate={minDate}
          maxDate={maxDate}>
          <List.Item arrow="horizontal">出生日期</List.Item>
        </DatePicker>
        <InputItem type="phone" value={phone} onChange={this.onPhoneChange}>手机号码</InputItem>
        <InputItem value={contact} onChange={this.onContactChange}>紧急联系人</InputItem>
        <InputItem type="phone" value={contactPhone} onChange={this.onContactPhoneChange}>联系人号码</InputItem>
        <div className="btn-wrapper">
          <Button type="primary" size="large" onClick={this.onSubmit}>提交</Button>
        </div>
      </div>);
  }
}

export default ProfileEditor;
