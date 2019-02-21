import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, message, Modal, Select, Input } from 'antd';
import { getShopDetData } from '../../../reduxs/action';
import { wantShopData } from "../../../api/shopApi";
import { isLogin } from "../../../comment/methods/util";
import Header from '../../../comment/header';
import Footer from '../../../comment/footer';

import './order.scss';

const Option = Select.Option;

function mapStateToProps(state) {
  return {
    shopDet: state.shopDet
  };
}

function mapDispatchToProps(dispatch) {
  return {
    singShopMsg(productId, shopId) {
      dispatch(getShopDetData(productId, shopId))
    }
  }
}

class UserOrder extends Component{
  constructor(props) {
    super(props);
    this.state = {
      orderCode: sessionStorage.getItem('orderCode'),
      shopMsg: [],
      orderShop: [],
      shopIndex: 0,
      orderMsg: {},
      zx_type: false,
      hd_type: false,
      kd_type: false,
      jj_type: false,
      visible: false
    };
  }
  componentWillMount() {
    let hisMsg = message.loading('加载中...');
    if(!isLogin()) {
      hisMsg();
      message.warning('还未登录哦，请先登录', 1.5).then(() => {
        this.props.history.push('login');
      });
      return;
    }
    Promise.all([
      wantShopData({ statements: `select * from userOrder where code='${ this.state.orderCode }'` }),
      wantShopData({ statements: `select * from orderMsg where p_code='${ this.state.orderCode }'` })
    ]).then(([data1, data2]) => {
      hisMsg();
      this.setState({
        orderMsg: data1[0],
        orderShop: data2,
        zx_type: data1[0].zf_type === '1' ? true : false,
        hd_type: data1[0].zf_type === '2' ? true : false,
        kd_type: data1[0].ps_type === '1' ? true : false,
        jj_type: data1[0].ps_type === '2' ? true : false
      }, () => {
        this.state.orderShop.forEach(item => {
          this.props.singShopMsg(item.product_id, item.shop_id);
        });
      });
    }, hisMsg);
  }
  shouldComponentUpdate(nextProps) {
    if(nextProps.shopDet !== this.props.shopDet) {
      this.state.shopMsg.push({
        ...nextProps.shopDet[0],
        ...this.state.orderShop[this.state.shopIndex]
      });
      this.state.shopIndex ++;
      this.setState({
        shopMsg: this.state.shopMsg
      }, () => {
        console.log(this.state.shopMsg);
      });
    }
    return true;
  }
  orderDistributionFn(ev) {
    let target = ev.target;
    switch(target.innerText) {
      case '快递配送(免运费)':
        this.setState({
          kd_type: true,
          jj_type: false
        });
        break;
      case 'EMS加急':
        this.setState({
          kd_type: false,
          jj_type: true
        });
        break;
    }
  }
  orderCollectionFn(ev) {
    let target = ev.target;
    switch(target.innerText) {
      case '在线支付':
        this.setState({
          zx_type: true,
          hd_type: false
        });
        break;
      case '货到付款':
        this.setState({
          zx_type: false,
          hd_type: true
        });
        break;
    }
  }
  showModal = () => {
    this.setState({
      visible: true,
    });
  };
  handleOk = (e) => {
    this.setState({
      visible: false,
    });
  };
  handleCancel = (e) => {
    this.setState({
      visible: false,
    });
  };

  render() {
    return (
      <div className="user-order">
        <Header />
        <div className="order-box">
          <div className="container">
            <div className="order-header">
              <b>订单号：</b>
              <span className="show-red fz_18">{ this.state.orderCode }</span>
            </div>
            <div className="shop-msg">
              <h5><b>商品信息</b></h5>
              <ul className="shop-ul no-select">
                {
                  this.state.shopMsg.map((item) => (
                    <li key={ item.order_code }>
                      <div className="shop-left" data-id={ item.shop_id }>
                        <div className="shop-img">
                          <img src={ item.shop_pic } alt=""/>
                        </div>
                        <div className="shop-name">
                          <p>{ item.shop_name }</p>
                        </div>
                      </div>
                      <div className="shop-right">
                        <div className="shop-pri">
                          <p>{ item.shop_pri } x <span className="show-red">{ item.shop_val }</span></p>
                        </div>
                        <div className="shop-tol">
                          <p className="show-red">{ (parseFloat(item.shop_pri) * item.shop_val).toFixed(2) }元</p>
                        </div>
                      </div>
                    </li>
                  ))
                }
              </ul>
            </div>
            <div className="zf_type o_flex">
              <div className="left">
                <b>支付方式</b>
              </div>
              <div className="right no-select" onClick={ (ev) => {
                this.orderCollectionFn(ev);
              } }>
                <span className={ this.state.zx_type ? 'sel_sp' : '' }>在线支付</span>
                <span className={ this.state.hd_type ? 'sel_sp' : '' }>货到付款</span>
              </div>
            </div>
            <div className="ps_type o_flex">
              <div className="left">
                <b>配送方式</b>
              </div>
              <div className="right no-select" onClick={ (ev) => {
                this.orderDistributionFn(ev);
              } }>
                <span className={ this.state.kd_type ? 'sel_sp' : '' }>快递配送(免运费)</span>
                <span className={ this.state.jj_type ? 'sel_sp' : '' }>EMS加急</span>
              </div>
            </div>
            <div className="address-box">
              <div className="address-head o_flex">
                <div className="left">
                  <b>收货地址</b>
                </div>
                <div className="right no-select">
                  <span onClick={this.showModal}>添加地址</span>
                </div>
              </div>
              <div className="address-con"></div>
            </div>
            <div className="user-msg">
              <textarea placeholder="说点什么吧~"></textarea>
            </div>
          </div>
          <div className="order-foo o_flex fz_16">
            <div className="foo-left">
              <p>共 <span className="show-red fz_18">{ this.state.orderMsg.shop_sum }</span> 件商品，合计：<span className="show-red fz_17">{ this.state.orderMsg.shop_total }元</span></p>
            </div>
            <div className="foo-right">
              <Button>再想想，取消订单</Button>
              <Button type="primary">确认订单</Button>
            </div>
          </div>
        </div>
        <Footer />
        <div>
          <Modal
            title="添加收货地址"
            visible={this.state.visible}
            onOk={this.handleOk}
            onCancel={this.handleCancel}
          >
            <div style={{ 'marginBottom': '15px' }}>
              <label htmlFor="sj_name">收件人：</label>
              <Input type="text" id="sj_name" style={{ width: '80%' }}/>
            </div>
            <div style={{ 'marginBottom': '15px' }}>
              <label htmlFor="dh_name">手机号：</label>
              <Input type="text" id="dh_name" style={{ width: '80%' }}/>
            </div>
            <div>
              <label>收货地址：</label>
              <Select style={{ width: 105, 'margin-right': '20px' }}>
                <Option value="jack">Jack</Option>
                <Option value="lucy">Lucy</Option>
              </Select>
              <Select style={{ width: 105, 'margin-right': '20px' }}>
                <Option value="jack">Jack</Option>
                <Option value="lucy">Lucy</Option>
              </Select>
              <Select style={{ width: 105 }}>
                <Option value="jack">Jack</Option>
                <Option value="lucy">Lucy</Option>
              </Select>
            </div>
          </Modal>
        </div>
      </div>
    )
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(UserOrder);