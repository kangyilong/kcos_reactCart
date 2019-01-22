import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Input, Button, message } from 'antd';
import { userLogin } from '../../api/userApi';
import { getElementFn } from '../../comment/methods/util';

import './login.scss';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      backUrl: sessionStorage.getItem('backUrl') || 'home',
      userName: '',
      userPaw: ''
    };
    this.resetOperation = this.resetOperation.bind(this);
    this.loginOperation = this.loginOperation.bind(this);
  }
  componentDidMount() {
    this.state.userName = getElementFn('name');
    this.state.userPaw = getElementFn('paw');
  }
  resetOperation() { // 重置操作
    this.state.userName.value = '';
    this.state.userPaw.value = '';
  }
  loginOperation() { // 登录操作
    let userName = this.state.userName.value.trim();
    let userPaw = this.state.userPaw.value.trim();
    if(!userName || !userPaw) {
      message.error('请填写完整');
      return;
    }
    let queryName = '';
    if(userName.includes('@')) {
      queryName = 'userEmail';
    } else {
      queryName = 'userName';
    }
    let statements = `SELECT * FROM userMsg WHERE ${queryName} = ? and userPaw = ?`;
    let parameter = JSON.stringify([userName, userPaw]);
    let hideMsg = message.loading('努力登录中...');
    userLogin({statements, parameter}).then(data => {
      hideMsg();
      if(data[0].id) {
        sessionStorage.setItem('isLogin', data[0].id);
        message.success('登录成功！').then(() => {
          this.props.history.push(this.state.backUrl);
        });
      } else {
        message.error('用户名或密码错误');
      }
    }, () => {
      hideMsg();
      message.error('登录失败，请重试');
    });
  }
  render() {
    return (
      <div className="login">
        <div className="header">
          <h5>Login</h5>
        </div>
        <div className="container">
          <div className="login-con">
            <div className="nick-box">
              <label htmlFor="name">用户名：</label>
              <Input id="name" required placeholder="请输入昵称或邮箱号"/>
            </div>
            <div className="paw-box">
              <label htmlFor="paw">密 码：</label>
              <Input type="password" id="paw" required/>
            </div>
            <div className="foo-btn">
              <Button onClick={ this.resetOperation }>重置</Button>
              <Button type="primary" onClick={ this.loginOperation }>登录</Button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default withRouter(Login);