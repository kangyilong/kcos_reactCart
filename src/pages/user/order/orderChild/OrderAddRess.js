import React, { Component } from 'react';
import { Cascader, Modal, Input, message } from 'antd';
import { wantShopData } from "../../../../api/shopApi";
import {getElementFn, getUserId, getCityData} from "../../../../comment/methods/util";

export default class AddRess extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user_id: getUserId(),
      visible: false,
      isAddRess: true,
      address_id: '',
      addRess: [],
      userAddRess: [],
      user_area: '',
      user_name: '',
      user_mobile: ''
    };
  }
  queryAddRess = () => {
    let a_statements = `SELECT * FROM userAddress WHERE user_id='${this.state.user_id}' AND is_default=1`;
    wantShopData({statements: a_statements}).then(data => {
      if(data.length > 0) {
        this.setState({
          isAddRess: false
        });
        this.setState({
          userAddRess: data.filter(item => !!item.is_default)
        }, () => {
          this.state.address_id = this.state.userAddRess[0].address_id;
          this.setState({
            addRess: [this.state.userAddRess[0].user_province, this.state.userAddRess[0].user_city, this.state.userAddRess[0].user_county],
            user_area: this.state.userAddRess[0].user_area ? this.state.userAddRess[0].user_area : '',
            user_mobile: this.state.userAddRess[0].user_mobile,
            user_name: this.state.userAddRess[0].user_name
          })
        });
      }
    });
  };
  showModal = () => {
    this.setState({
      visible: true,
    });
  };
  handleOk = () => {
    /*
    * 若无地址则直接为默认收货地址，新增完后需把地址编号加入订单表中
    * 有地址则为修改地址
    * 增加数据：insert into 表名 (字段1,字段2,字段3) values (?,?,?)
    * 修改数据：update 表名 set 字段1 = ?,字段2 = ?,字段3 = ? where id = ?
    * */
    let hasMsg = message.loading('');
    let name = getElementFn('sj_name').value;
    let mobile = getElementFn('dh_name').value;
    let area = getElementFn('area_id').value;
    let r_statements = '', r_parameter = '';
    let addRess_id = `kcos1314_Ar${new Date().getTime()}${Math.floor(Math.random() * 1000)}`;
    if(this.state.isAddRess) {
      r_statements = `insert into userAddress (address_id,user_id,user_name,user_mobile,user_province,user_city,user_county,user_area,is_default) values (?,?,?,?,?,?,?,?,?)`;
      r_parameter = JSON.stringify([
        addRess_id,
        this.state.user_id,
        name,
        mobile,
        ...this.state.addRess,
        area,
        1
      ]);
    }else {
      r_statements = `update userAddress set user_name = ?,user_mobile = ?,user_province = ?, user_city = ?, user_county = ?, user_area = ?, is_default = ? where address_id = ? AND user_id = ?`;
      r_parameter = JSON.stringify([
        name,
        mobile,
        ...this.state.addRess,
        area,
        1,
        this.state.address_id,
        this.state.user_id
      ]);
    }
    wantShopData({statements: r_statements, parameter: r_parameter}).then(() => {
      hasMsg();
      message.success('操作成功', 1.5);
      this.setState({
        visible: false
      });
      if(this.state.isAddRess) {
        let o_statements = `update userOrder set add_ress_id = '${addRess_id}' where code = '${this.props.o_code}'`;
        wantShopData({statements: o_statements});
      }
      this.queryAddRess();
    }, hasMsg);
  };
  handleCancel = () => {
    this.setState({
      visible: false,
    });
  };
  showAddressFn = () => {
    if(this.state.userAddRess[0]) {
      return (
        <p>
          <b className="fz_17">{this.state.user_name + '(' + this.state.user_mobile + ')'}</b>
          ——
          {
            `${this.state.userAddRess[0].user_province} ${this.state.userAddRess[0].user_city} ${this.state.userAddRess[0].user_county} ${this.state.userAddRess[0].user_area ? this.state.userAddRess[0].user_area : ''}`
          }
        </p>
      )
    }else {
      return null;
    }
  };
  componentWillMount() {
    /*
    * 查询用户地址表中数据
    * 存在默认收货地址则修改
    * 不存在收货地址则新增
    * */
    this.queryAddRess();
  }
  render() {
    return (
      <>
        <div className="address-head o_flex">
          <div className="left">
            <b>收货地址</b>
          </div>
          <div className="right no-select o_flex address-p">
            {
              this.showAddressFn()
            }
            <span onClick={this.showModal}>{this.state.isAddRess ? '添加地址' : '修改地址'}</span>
          </div>
        </div>

        <Modal
          title="添加收货地址"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          okText="确认"
          cancelText="取消"
        >
          <div style={{ 'marginBottom': '15px' }}>
            <label htmlFor="sj_name">收件人：</label>
            <Input type="text" id="sj_name" style={{ width: '80%' }} defaultValue={this.state.user_name}/>
          </div>
          <div style={{ 'marginBottom': '15px' }}>
            <label htmlFor="dh_name">手机号：</label>
            <Input type="text" id="dh_name" style={{ width: '80%' }} defaultValue={this.state.user_mobile}/>
          </div>
          <div style={{ 'marginBottom': '15px' }}>
            <label>收货地址：</label>
            <Cascader
              options={getCityData()}
              defaultValue={this.state.addRess}
              placeholder="请选择收货地址"
              style={{'width': '77%'}}
              onChange={(values) => {
                this.state.addRess = values;
              }}
            />
          </div>
          <div>
            <label htmlFor="area_id">详细地址：</label>
            <Input type="text" id="area_id" style={{ width: '80%' }} defaultValue={this.state.user_area}/>
          </div>
        </Modal>
      </>
    )
  }
}