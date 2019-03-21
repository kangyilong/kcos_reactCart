import React, {Component} from 'react';
import OwnerComponentHeader from './owner-component/OwnerComponentHeader';
import OwnerComponentMsg from './owner-component/OwnerComponentMsg';
import { NavLink } from 'react-router-dom';
import { Icon, Modal, Input, message } from 'antd';
import { getUserId } from '../../../../comment/methods/util';
import { wantShopData } from '../../../../api/shopApi';

interface props {
  isShow?: boolean,
  targetLeft: Function
}

export default class Owner extends Component <props, any> {
    state = {
        user_id: getUserId(),
        visible: false,
        changeNick: null,
        changeEmail: null,
        changeMobile: null,
        user_nick_name: '',
        user_email: '',
        user_mobile: ''
    };
    showModal = (e: any) => {
        e.preventDefault();
        this.setState({
            visible: true,
        });
    };

    componentWillMount() {
        const u_statements = `SELECT user_nick_name, user_email, user_mobile FROM userMsg WHERE user_id='${this.state.user_id}'`;
        wantShopData({statements: u_statements}).then(data => {
            this.setState({
                user_nick_name: data[0].user_nick_name,
                user_email: data[0].user_email,
                user_mobile: data[0].user_mobile
            });
        });
    }

    handleOk = () => {
        if(!this.state.changeNick && !this.state.changeEmail && !this.state.changeMobile) {
            this.setState({
                visible: false
            });
            return;
        }
        const hasMsg = message.loading('');
        // update 表名 set 字段1 = ?,字段2 = ?,字段3 = ? where id = ?
        const statements = `UPDATE userMsg SET user_nick_name=?, user_email=?, user_mobile=? WHERE user_id=?`;
        const parameter = JSON.stringify([
            this.state.changeNick ? this.state.changeNick : this.state.user_nick_name,
            this.state.changeEmail ? this.state.changeEmail : this.state.user_email,
            this.state.changeMobile ? this.state.changeMobile : this.state.user_mobile,
            this.state.user_id
        ]);
        wantShopData({statements, parameter}).then(() => {
            hasMsg();
            message.success('操作成功', 1.5);

            this.setState({
                visible: false
            });
        }, hasMsg);
    };

    handleCancel = () => {
        this.setState({
            visible: false,
        });
    };
  render() {
    const {isShow} = this.props;
    return (
      <div className={`${isShow ? 'none' : ''} owner-warp`}>
          <OwnerComponentHeader />
          <OwnerComponentMsg targetLeft={this.props.targetLeft}/>
          <div className="owner-con">
            <ul onClick={() => {
              this.props.targetLeft();
            }}>
              <li>
                  <div className="con-li_order">
                      <NavLink to="/personal-index?index=2"><span><Icon type="ordered-list" /></span>查看所有订单</NavLink>
                  </div>
              </li>
              <li>
                  <div className="con-li_coll">
                      <NavLink to="/personal-index?index=3"><span><Icon type="star" /></span>我的收藏</NavLink>
                  </div>
              </li>
              <li>
                  <div className="con-li_addRess">
                      <NavLink to="/personal-index?index=4"><span><Icon type="environment" /></span>收货地址</NavLink>
                  </div>
              </li>
              <li>
                  <div className="con-li_cons">
                      <NavLink to="/personal-index?index=5"><span><Icon type="dollar" /></span>消费明细</NavLink>
                  </div>
              </li>
              <li onClick={this.showModal}>
                  <div className="con-li_owner">
                      <p><span><Icon type="form" /></span>修改个人信息</p>
                  </div>
              </li>
            </ul>
          </div>
          <Modal
              title="修改个人信息"
              visible={this.state.visible}
              onOk={this.handleOk}
              onCancel={this.handleCancel}
              okText="确定"
              cancelText="取消"
          >
              <p>
                  <label htmlFor="nickname">昵称：</label>
                  <Input name="nickname" placeholder="请输入昵称" style={{'width': '90%'}} onChange={(val: any) => {this.setState({changeNick: val.target.value})}}/>
              </p>
              <p style={{'margin': '25px 0'}}>
                  <label htmlFor="email">邮箱：</label>
                  <Input name="email" placeholder="请输入邮箱" style={{'width': '90%'}} onChange={(val: any) => {this.setState({changeEmail: val.target.value})}}/>
              </p>
              <p>
                  <label htmlFor="mobile">手机：</label>
                  <Input name="mobile" placeholder="请输入手机" style={{'width': '90%'}} onChange={(val: any) => {this.setState({changeMobile: val.target.value})}}/>
              </p>
          </Modal>
      </div>
    )
  }
}