import React, { Component } from 'react';
import { Button, Icon, Modal, Input, Cascader, message } from 'antd';
import {wantShopData} from '../../../../api/shopApi.js';
import NotData from '../../../../comment/notData/notData.js';
import {getUserId, getCityData} from '../../../../comment/methods/util.js';
import {getElementFn} from "../../../../comment/methods/util";

export interface Props {
    isShow?: boolean
}

export default class AddRess extends Component<Props, any> {

  state = {
      addRessData: [],
      userId: getUserId(),
      visible: false,
      addRess: [],
      user_name: '',
      user_mobile: '',
      user_area: '',
      isAddRess: true,
      exitAddRessId: '',
      is_default: null
  };

  addShowModal = () => {
      this.setState({
          visible: true,
          isAddRess: true,
          addRess: [],
          user_name: '',
          user_mobile: '',
          user_area: '',
          exitAddRessId: ''
      });

  };

  editShowModal = (item = {
      address_id: '',
      user_name: '',
      user_mobile: '',
      user_area: '',
      user_province: '',
      user_city: '',
      user_county: '',
      is_default: ''
  }, ev: any) => {
      ev.stopPropagation();
      this.setState({
          exitAddRessId: item['address_id'],
          visible: true,
          isAddRess: false,
          is_default: item['is_default'],
          user_name: item['user_name'],
          user_mobile: item['user_mobile'],
          user_area: item['user_area'],
          addRess: [item['user_province'], item['user_city'], item['user_county']]
      });
  };

  delShowModal = (item = {address_id: '', is_default: 0}, index: number, ev: any) => {
      // delete from 表名 where id = ?
      ev.stopPropagation();
      if(item.is_default === 0) {
          let hasMsg = message.loading('');
          let d_statements = `DELETE FROM userAddress WHERE address_id = '${item['address_id']}' AND user_id = '${this.state.userId}'`;
          wantShopData({statements: d_statements}).then(() => {
              hasMsg();
              message.success('删除成功', 1);
              let addRessData = this.state.addRessData;
              addRessData.splice(index, 1);
              this.setState({
                  addRessData
              });
          }, hasMsg);
      }
      if(item.is_default === 1) {
          message.warning('不能删除默认地址', 1);
          return;
      }
  };

  handleOk = () => {
      let sj_name: any = getElementFn('sj_name'), name = sj_name['value'].trim();
      let dh_name: any = getElementFn('dh_name'), mobile = dh_name['value'].trim();
      let area_id: any = getElementFn('area_id'), area = area_id['value'].trim();
      let r_statements = '', r_parameter = '';
      if(!name || !mobile || !area || this.state.addRess.length < 3) {
          message.warning('请填写完整', 1.5);
          return;
      }
      let hasMsg = message.loading('');
      if(this.state.isAddRess && !this.state.exitAddRessId) { // 新增
          let addRess_id = `kcos1314_Ar${new Date().getTime()}${Math.floor(Math.random() * 1000)}`;
          r_statements = `insert into userAddress (address_id,user_id,user_name,user_mobile,user_province,user_city,user_county,user_area,is_default) values (?,?,?,?,?,?,?,?,?)`;
          r_parameter = JSON.stringify([
              addRess_id,
              this.state.userId,
              name,
              mobile,
              ...this.state.addRess,
              area,
              this.state.addRessData.length > 0 ? 0 : 1
          ]);
      }else { // 修改
          r_statements = `update userAddress set user_name = ?,user_mobile = ?,user_province = ?, user_city = ?, user_county = ?, user_area = ? where address_id = ? AND user_id = ?`;
          r_parameter = JSON.stringify([
              name,
              mobile,
              ...this.state.addRess,
              area,
              this.state.exitAddRessId,
              this.state.userId
          ]);
      }
      wantShopData({statements: r_statements, parameter: r_parameter}).then(() => {
          hasMsg();
          message.success('操作成功', 1);
          this.queryUserAddRess();
      }, hasMsg);
      this.setState({
          visible: false
      });
  };

  handleCancel = () => {
      this.setState({
          visible: false
      });
  };

  queryUserAddRess = () => {
      let statements = `SELECT * FROM userAddress WHERE user_id = '${this.state.userId}'`;
      wantShopData({statements}).then(data => {
          this.setState({
              addRessData: data
          })
      });
  };

  selectedDefault(item = {is_default: 0, address_id: ''}) {
      if(this.state.addRessData.length > 1) {
          if(item.is_default === 0) {
              let hasMsg = message.loading('');
              let a_statements = `update userAddress set is_default=0 where user_id='${this.state.userId}' AND is_default=1 AND address_id!='${item.address_id}'`;
              let statements = `update userAddress set is_default=1 where address_id='${item.address_id}' AND user_id='${this.state.userId}'`;
              Promise.all([
                  wantShopData({statements: a_statements}),
                  wantShopData({statements})
              ]).then(() => {
                  hasMsg();
                  this.queryUserAddRess();
              }, hasMsg);
              return;
          }
          if(item.is_default === 1) {
              message.warning('已设为默认地址');
              return;
          }
      }else {
          message.warning('需存在一条默认地址');
          return;
      }
  }

  componentWillMount() {
    this.queryUserAddRess();
  }

  render() {
    let { isShow } = this.props;
    return (
      <div className={ `${isShow ? 'none' : ''} addRess` }>
        <div className="add-btn">
            <Button type="primary" onClick={this.addShowModal}>添加收货地址</Button>
        </div>
        <div className="addRess-box">
          <ul className="elm_flex">
              {
                  this.state.addRessData.length > 0 ? this.state.addRessData.map((item, index) => (
                    <li
                        key={index}
                        className={item['is_default'] === 1 ? 'sel_li' : ''}
                        onClick={this.selectedDefault.bind(this, item)}
                    >
                        <h5>{item['user_name']}</h5>
                        <p className="mobile">{item['user_mobile']}</p>
                        <p className="add_ress">{`${item['user_province']}-${item['user_city']}-${item['user_county']}-${item['user_area']}`}</p>
                        <p className="operation">
                            <Icon type="edit" style={{'marginRight': '5px'}} onClick={(ev) => {
                                this.editShowModal(item, ev)
                            }}/>
                            <Icon type="delete" onClick={(ev) => {
                                this.delShowModal(item, index, ev)
                            }}/>
                        </p>
                    </li>
                )) : null
              }
          </ul>
          <div className={this.state.addRessData.length === 0 ? '' : 'none'}>
              <NotData promptTxt="暂无地址"/>
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
                <Input type="text" id="sj_name" style={{ width: '80%' }} value={this.state.user_name} onChange={(ev) => {this.setState({user_name: ev.target.value})}}/>
            </div>
            <div style={{ 'marginBottom': '15px' }}>
                <label htmlFor="dh_name">手机号：</label>
                <Input type="text" id="dh_name" style={{ width: '80%' }} value={this.state.user_mobile} onChange={(ev) => {this.setState({user_mobile: ev.target.value})}}/>
            </div>
            <div style={{ 'marginBottom': '15px' }}>
                <label>收货地址：</label>
                <Cascader
                    options={getCityData()}
                    value={this.state.addRess}
                    placeholder="请选择收货地址"
                    style={{'width': '77%'}}
                    onChange={(values) => {
                        this.setState({
                            addRess: values
                        })
                    }}
                />
            </div>
            <div>
                <label htmlFor="area_id">详细地址：</label>
                <Input type="text" id="area_id" style={{ width: '80%' }} value={this.state.user_area} onChange={(ev) => {this.setState({user_area: ev.target.value})}}/>
            </div>
        </Modal>
      </div>
    )
  }
}