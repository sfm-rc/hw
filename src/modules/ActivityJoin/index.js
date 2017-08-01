import React, { Component } from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import './index.less';
import { InputItem, Picker, List, Button, Checkbox, ActivityIndicator, Modal } from 'antd-mobile';

const AgreeItem = Checkbox.AgreeItem;
import * as actionCreators from './action';

@connect(
  state => ({
    ActivityJoinViewer: state.ActivityJoinViewer,
  }),
  dispatch => bindActionCreators(actionCreators, dispatch)
)
class ActivityJoin extends Component {
    constructor(props){
        super(props);
    }

    static propTypes = {
      ActivityJoinViewer: PropTypes.object,
      getActivity: PropTypes.func,
      joinActivity: PropTypes.func,
    }

    state = {
        credentialValue: ['1'],
        sexOptions: [{ value: '1', label: '男' }, { value: '0', label: '女' }],
        sexValue: ['1'],
        activity: {},
        isModalShow: false,
        modalMessage: '',
        joinDetail: {
          user_name:"",
          user_name_alias: "",
          sex: 1,
          mobile: '',
          down_payment: 0,
          activity_id: 2,
          extra: "ooooo"
        }
    }

    componentWillMount(){
      this.props.getActivity({ id: '2' }).then((response) => {
        const data = response.resolved.data;
        const activity = data.data;
        this.setState({ 
          activity,
          animating: false
         });
      });
      this.setState({animating: true})

    }

    join = () => {
      this.props.joinActivity({

      }).then((response) => {
        if(response.resolved.data.code==0){
          this.setState({ animating: false, modalMessage: '报名成功' });

        }
      })
      this.setState({ animating: true });
    }

    onCloseModal = () => {
      this.setState({isModalShow: false});
    }

    onChangeNameAlias = () => {
      this.setState({

      })
    }

  render() {
    const {sexOptions, sexValue} = this.state;
    const { activity, animating, modalMessage, isModalShow } = this.state;

    return (
      <div className="hw-activity-join">
        <ActivityIndicator
          toast
          text="数据加载中"
          animating={animating}
          />

        <div className="head">
          <img src={activity.image_url} alt="" />
          <div className='head-content'>
              <h2 className="head-title">{activity.title}</h2>
              <div className="head-sub-title">
                <span>温馨提示:</span><span>{activity.note}</span>
              </div>
          </div>
        </div>
        <div className="join-wrapper">
            <InputItem onChange={} >户外花名</InputItem>
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
        <Modal
          title="提示"
          transparent
          maskClosable={false}
          visible={isModalShow}
          onClose={this.onCloseModal}
          footer={[{ text: '确定', onPress: () => { console.log('ok'); this.onClose(); } }]}
        >
          {modalMessage}
        </Modal>
      </div>
    );
  }
}

export default ActivityJoin;
