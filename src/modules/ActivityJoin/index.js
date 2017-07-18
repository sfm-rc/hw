import React, { Component } from 'react';
// import Activity from './Activity';
import './index.less';
import { InputItem, Picker, List, Button, Checkbox } from 'antd-mobile';

const AgreeItem = Checkbox.AgreeItem;

class ActivityJoin extends Component {
    constructor(props){
        super(props);
    }

    state = {
        credentialValue: ['1'],
        sexOptions: [{ value: '1', label: '男' }, { value: '0', label: '女' }],
        sexValue: ['1'],
        name: '',
    }

  render() {
    const {sexOptions, sexValue} = this.state;

    return (
      <div className="hw-activity-join">
        <div className="head">
          <img src="http://58pic.ooopic.com/58pic/12/81/90/27v58PICbU9.jpg" alt="" />
          <div className='head-content'>
              <h2 className="head-title">6月28-30日三尖重装穿越</h2>
              <div className="head-sub-title">
                <span>温馨提示:</span><span>旅行期间需要自备干粮</span>
              </div>
          </div>
        </div>
        <div className="join-wrapper">
            <InputItem >户外花名</InputItem>
            <InputItem>姓名</InputItem>
            <Picker
                data={sexOptions}
                cols={1} className="forss" value={sexValue} onChange={v => this.setState({ sexValue: v })}>
                <List.Item arrow="horizontal">性别</List.Item>
            </Picker>
            <InputItem
                type="phone"
                placeholder="186 1234 1234"
            >手机号码</InputItem>
            
            <InputItem
                placeholder="0.00"
                extra="¥"
            >定金</InputItem>
            <InputItem>其他</InputItem>

            <AgreeItem data-seed="logId" onChange={e => console.log('checkbox', e)}>
            我已阅读并同意旅游局认定的<a onClick={(e) => { e.preventDefault(); alert('agree it'); }}>《服务条款》</a>
            </AgreeItem>

            <Button style={{ margin: '40px' }} className="btn" type="primary">报名</Button>
          {/* <Activity /> */}
        </div>
      </div>
    );
  }
}

export default ActivityJoin;
