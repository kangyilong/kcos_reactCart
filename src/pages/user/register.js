import React, { Component } from 'react';
import { Input, Button, message } from 'antd';
import { userRegister, validationUser } from '../../api/userApi';
import { getElementFn } from '../../comment/methods/util';
import './register.scss';

export default class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      iupIndex: 0,
      backUrl: sessionStorage.getItem('backUrl') || 'home',
      userName: '',
      userEmail: '',
      userPaw: '',
      qrPaw: ''
    };
    this.regSubmitFn = this.regSubmitFn.bind(this);
    this.regResetFn = this.regResetFn.bind(this);
    this.validationData = this.validationData.bind(this);
  }
  componentDidMount() {
    this.state.userPaw = getElementFn('paw');
    this.state.qrPaw = getElementFn('qr-paw');
    this.state.userName = getElementFn('name');
    this.state.userEmail = getElementFn('email');
  }
  regSubmitFn() { // 注册操作
    let userEmail = this.state.userEmail.value.trim();
    let userName = this.state.userName.value.trim();
    let userPaw = this.state.userPaw.value.trim();
    let qrPaw = this.state.qrPaw.value.trim();
    if(!userEmail ||
      !userName ||
      !userPaw ||
      !qrPaw) {
      message.error('请填写完整');
      return;
    }
    if(userPaw !== qrPaw) {
      message.error('密码不一致');
      return;
    }
    let statements = 'insert into userMsg(id, userName, userEmail, userPaw) values (?, ?, ?, ?)';
    let userId = 'kcos1314' + new Date().getTime();
    let parameter = JSON.stringify([
      userId,
      userName,
      userEmail,
      userPaw
    ]);
    let hideMsg = message.loading('正在努力为你注册中...', 0);
    userRegister({statements, parameter}).then(data => {
      hideMsg();
      if(data.msg === 'ok') {
        message.success('注册成功').then(() => {
          sessionStorage.setItem('isLogin', userId);
          this.props.history.push(this.state.backUrl);
        });
      }
    }, () => {
      hideMsg();
      message.error('噢，注册失败了');
    });
  }
  regResetFn() { // 重置操作
    this.state.userPaw.value = '';
    this.state.qrPaw.value = '';
    this.state.userName.value = '';
    this.state.userEmail.value = '';
  }
  validationData(queryName, target, objName) {
    let statements = `select * from userMsg where ${queryName} = ?`;
    let parameter = JSON.stringify([target.value]);
    validationUser({ statements, parameter }).then(data => {
      if(data.length > 0) {
        message.error(`抱歉，该${objName}已存在`);
        target.value = '';
        target.focus();
      }
    });
  }
  render() {
    return (
      <div className="register">
        <h4>注册</h4>
        <div className="content">
          <div className="reg-container">
            <div className="reg-form">
              <div className="reg-name">
                <label htmlFor="name">昵 称:</label>
                <Input id="name" required onBlur={ (e) => {
                  let target = e.target;
                  this.validationData('userName', target, '昵称');
                } }/>
              </div>
              <div className="reg-email">
                <label htmlFor="email">邮 箱:</label>
                <Input id="email" type="email" required onBlur={ (e) => {
                  let target = e.target;
                  this.validationData('userEmail', target, '邮箱');
                } }/>
              </div>
              <div className="reg-paw">
                <label htmlFor="paw">密 码:</label>
                <Input id="paw" type="password" required/>
              </div>
              <div className="reg-qr_paw">
                <label htmlFor="qr-paw">确认密码:</label>
                <Input id="qr-paw" type="password" required/>
              </div>
            </div>
            <div className="reg-foo">
              <div className="foo-btn">
                <Button onClick={ this.regResetFn }>重置</Button>
                <Button type="primary" onClick={ this.regSubmitFn }>确认</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}