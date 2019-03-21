import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { operationAllShop } from '../../reduxs/action';
import { Button, message } from 'antd';
import { getUserId } from "../../comment/methods/util";
import { wantShopData } from "../../api/shopApi";

import './userShopTotal.scss';

function mapStateToProps(state) {
  return {
    cartShopData: state.userCartData
  };
}

function mapDispatchToProps(dispatch) {
  return {
    selectStatus(seleStatus) {
      dispatch(operationAllShop(seleStatus))
    }
  }
}

class UserShopTotal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      optxt: '取消全选',
      totalMsg: {},
      userId: getUserId()
    };
    this.selectAllShop = this.selectAllShop.bind(this);
    this.userOrderFn = this.userOrderFn.bind(this);
  }
  componentWillReceiveProps(nextProps) {
    let shopLen = 0, shopTotal = 0;
    nextProps.cartShopData.forEach(item => {
      if(item.isSelected) {
        shopLen ++;
        shopTotal += parseFloat(item.shop_pri) * parseFloat(item.shop_val);
      }
    });
    this.setState({
      totalMsg: {
        len: shopLen,
        total: shopTotal
      },
      optxt: shopLen === nextProps.cartShopData.length ? '取消全选' : '全 选'
    });
  }
  selectAllShop() {
    if(this.state.optxt === '全 选') {
      this.props.selectStatus('SELECTED_S');
      this.setState({
        optxt: '取消全选'
      });
    }else {
      this.props.selectStatus('CANCEL_S');
      this.setState({
        optxt: '全 选'
      });
    }
  }
  userOrderFn() {
    /*
    * 生成待付款订单
    * 生成订单后购物车中商品除去
    * 增加数据：insert into 表名 (字段1,字段2,字段3) values (?,?,?)
    * */
    let hisMsg = message.loading('正为您生成订单，请稍等...');
    let orderShop = this.props.cartShopData.filter(item => item.isSelected);
    let p_code = 'kcos1314_o' + new Date().getTime() + Math.floor(Math.random() * 1000);
    orderShop.forEach(item => {
      // 生成详情订单语句
      let statement = `insert into orderMsg (order_code,shop_id,shop_pri,shop_val,p_code) values (?,?,?,?,?)`;
      let params = JSON.stringify([
        'kcos1314_Od' + new Date().getTime() + Math.floor(Math.random() * 10000),
        item.shop_id,
        item.shop_pri,
        item.shop_val,
        p_code
      ]);
      // 去除生成订单的商品
      let p_statements = `delete from userCart where shop_id='${item.shop_id}' and user_id='${this.state.userId}'`;
      Promise.all([
        wantShopData({ statements: statement, parameter: params }),
        wantShopData({ statements: p_statements })
      ])
    });

    // 生成主订单语句
    // 获取用户的默认地址
    let a_statements = `SELECT address_id FROM userAddress WHERE user_id='${this.state.userId}' AND is_default=1`;
    wantShopData({ statements: a_statements }).then(data => {
      let o_time = new Date().getTime().toString();
      let statements = `insert into userOrder (code,user_id,shop_total,shop_sum,o_status,zf_type,ps_type,o_time,add_ress_id) values (?,?,?,?,?,?,?,?,?)`;
      let parameter = JSON.stringify([
        p_code,
        this.state.userId,
        this.state.totalMsg.total.toFixed(2),
        this.state.totalMsg.len,
        '待付款',
        '1',
        '1',
        o_time,
        data[0].address_id
      ]);
      wantShopData({ statements, parameter }).then(data => {
        hisMsg();
        if(data.msg === 'ok') {
          sessionStorage.setItem('orderCode', p_code);
          this.props.history.push('/userOrder');
        }
      }, hisMsg);
    }, hisMsg);
  }
  render() {
    return (
      <div className="user-shop_total">
        <div className="left">
          <Button onClick={ this.selectAllShop }>{this.state.optxt}</Button>
        </div>
        <div className="right">
          <p>共 <span>{ this.state.totalMsg.len ? this.state.totalMsg.len : 0 }</span> 件商品，合计：<span>{ this.state.totalMsg.total ? this.state.totalMsg.total.toFixed(2) : 0.00 }</span> 元</p>
          <div className="r-btn">
            <Button type="primary" onClick={ this.userOrderFn }>去结算</Button>
          </div>
        </div>
      </div>
    );
  }
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(UserShopTotal));