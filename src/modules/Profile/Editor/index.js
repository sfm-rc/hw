import React, { Component } from 'react';

import './index.less';

class ProfileEditor extends Component {

  state = {
    certificationOptions: [
      { value: 'id', label: '身份证' },
      { value: 'id2', label: '护照' },
    ],
    certification: 'id',
    time: new Date(),
    isOpen: true,
  }

  onCertifationChange = (value) => {
    this.setState({ certification: value });
  }

  handleClick = () => {
    this.setState({ isOpen: true });
  }

  handleCancel = () => {
    this.setState({ isOpen: false });
  }

  handleSelect = (time) => {
    this.setState({ time, isOpen: false });
  }

  render() {
    const { certificationOptions, certification } = this.state;
    return (
      <div className="hw-profile-editor">
        <div className="title">被保人信息</div>
        <div className="info-type">姓名</div>
        <div className="input-wrapper">
          <input type="text" className="info-input" />
        </div>
        <div className="info-type">证件类型</div>
        <div className="input-wrapper">
        </div>
        <div className="info-type">证件号码</div>
        <div className="input-wrapper">
          <input type="text" className="info-input" />
        </div>
        <div className="info-type">性别</div>
        <div className="input-wrapper">
          <input type="text" className="info-input" />
        </div>
        <div className="info-type">出生日期</div>
        <div className="input-wrapper">
        </div>
        <div className="info-type">手机号码</div>
        <div className="input-wrapper">
          <input type="text" className="info-input" />
        </div>
        <div className="info-type">紧急联系人</div>
        <div className="input-wrapper">
          <input type="text" className="info-input" />
        </div>
        <div className="info-type">紧急联系人手机号码</div>
        <div className="input-wrapper">
          <input type="text" className="info-input" />
        </div>
      </div>);
  }
}

export default ProfileEditor;
