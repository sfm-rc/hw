import React, { Component } from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import './index.less';
import { InputItem, Picker, List, Button, Checkbox, ActivityIndicator, Modal, TextareaItem } from 'antd-mobile';

const AgreeItem = Checkbox.AgreeItem;
import * as actionCreators from './action';
import ServiceClause from './service-clause';

@connect(
  state => ({
    ActivityJoinViewer: state.ActivityJoinViewer,
  }),
  dispatch => bindActionCreators(actionCreators, dispatch)
)
class ActivityJoin extends Component {
    constructor(props){
        super(props);
        window.document.title = '报名';
    }

    static propTypes = {
      ActivityJoinViewer: PropTypes.object,
      getActivity: PropTypes.func,
      joinActivity: PropTypes.func,
    }

    state = {
        credentialValue: ['1'],
        sexOptions: [{ value: 1, label: '男' }, { value: 0, label: '女' }],
        activity: {},
        isModalShow: false,
        modalMessage: '',
        joinDetail: {
          user_name:"",
          user_name_alias: "",
          sex: 1,
          mobile: '',
          down_payment: 0,
          extra: "",
          activity_id: this.props.match.params.activity_id
        },
        isAgree: false,
        serviceModal: false,
    }

    componentWillMount(){
      this.props.getActivity({ id: this.props.match.params.activity_id }).then((response) => {
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
      if(!this.state.isAgree) {
        this.setState({
          isModalShow: true,
          modalMessage: '请阅读服务条款'
        })
        return;
      }
      
      this.props.joinActivity(this.state.joinDetail).then((response) => {
        this.setState({isModalShow: true, modalMessage: response.resolved.data.message});
         this.setState({ animating: false });
      }).catch((err)=>{
         this.setState({ animating: false });
        Toast.fail(`服务异常:${err}`, 2);
      });
      this.setState({ animating: true });
    }

    onCloseModal = () => {
      this.setState({isModalShow: false});
    }

    onChangeNameAlias = (val) => {
      this.state.joinDetail.user_name_alias = val;
      const { joinDetail } = this.state;
      this.setState({joinDetail})
    }

    onChangeName = (val) => {
      this.state.joinDetail.user_name = val;
      const { joinDetail } = this.state;
      this.setState({joinDetail})
    }

    onChangeMobile = (val) => {
      this.state.joinDetail.mobile = val;
      const { joinDetail } = this.state;
      this.setState({joinDetail})      
    }

    onChangeDownPayment = (val) => {
      this.state.joinDetail.down_payment = val;
      const { joinDetail } = this.state;
      this.setState({joinDetail})  
    }

    onChangeExtra = (val) => {
      this.state.joinDetail.extra = val;
      const { joinDetail } = this.state;
      this.setState({joinDetail});
    }

    switchServiceModal = (is) => {
        this.setState({serviceModal: is});
    }

  render() {
    const {sexOptions} = this.state;
    const { activity, animating, modalMessage, isModalShow, joinDetail } = this.state;

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
                <span>温馨提示:</span><span>
                  {/*{activity.note}*/}
                  请您仔细阅读活动图文，也可以跟领队联络沟通后再行报名。
                  </span>
              </div>
          </div>
        </div>
        <div className="join-wrapper">
            <InputItem onChange={this.onChangeNameAlias} value={joinDetail.user_name_alias} placeholder="请输入您的户外花名" >户外花名</InputItem>
            <InputItem onChange={this.onChangeName} value={joinDetail.user_name} placeholder="请输入您的真实姓名">姓名</InputItem>
            <Picker
                data={sexOptions}
                cols={1} className="forss" value={[joinDetail.sex]} 
                onChange={v => this.setState({ joinDetail: Object.assign(joinDetail, {sex: v[0]}) })}>
                <List.Item arrow="horizontal">性别</List.Item>
            </Picker>
            <InputItem
                type="phone"
                placeholder="请输入您常用的手机号"
                value={joinDetail.mobile}
                onChange={this.onChangeMobile}
            >手机号码</InputItem>
            
            <InputItem
                placeholder="0.00"
                extra="¥"
                value={joinDetail.down_payment}
                onChange={this.onChangeDownPayment}
            >定金</InputItem>
            <TextareaItem value={joinDetail.extra} onChange={this.onChangeExtra} rows={3} style={{marginRight: '1rem'}}
                          placeholder="您可以填写 报名人数、是否有老人小孩及其年龄、缺少装备等补充情况，以便领队知晓" title="其他"></TextareaItem>

            <AgreeItem data-seed="logId" onChange={e => {
               this.setState({isAgree: e.target.checked})
              }
              }>
            我已阅读并同意旅游局认定的<a onClick={(e) => {
                this.switchServiceModal(true);
              e.preventDefault(); }}>《服务条款》</a>
            </AgreeItem>

            <Modal
                title="服务条款"
                transparent
                maskClosable={false}
                style={{ width: 'inherit', height: '100%'}}
                visible={this.state.serviceModal}
                onClose={()=>this.switchServiceModal(false)}
                footer={[{ text: '确定', onPress: () => { console.log('ok'); this.switchServiceModal()(false); } }]}
            >
                <ServiceClause />
            </Modal>



            <Button style={{ margin: '40px' }} className="btn" type="primary" onClick={this.join}>报名</Button>
        </div>
        <Modal
          title="提示"
          transparent
          maskClosable={false}
          visible={isModalShow}
          onClose={this.onCloseModal}
          platform="ios"
          style={{ width: 'inherit'}}
          footer={[{ text: '确定', onPress: () => { console.log('ok'); this.onCloseModal(); } }]}
        >
          {modalMessage}
        </Modal>
      </div>
    );
  }
}

export default ActivityJoin;
