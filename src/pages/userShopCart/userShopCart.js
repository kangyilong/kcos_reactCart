import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import Header from '../../comment/header';
import Footer from '../../comment/footer';
import RemShop from '../remUserShop/remShop';
import { Table, Button, message } from 'antd';
import ShopCartList from './shopCartList';
import UserShopTotal from './userShopTotal';
import { wantShopData } from '../../api/shopApi';
import {toHeavyFn} from "../../comment/methods/util";

import './userShopCart.scss';

function mapStateToProps(state) {
  return {
    shopTotal: state.changeSingSum
  };
}

class UserShopCart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      productData: [],
      data: [],
      totalMsg: {}, // 单选后总价
      totalData: [], // 全选后总价
      cartLength: 0,
      statements: 'SELECT * FROM shopMsg',
      statementsCart: 'SELECT * FROM userCart'
    };
    this.allShopOption = this.allShopOption.bind(this);
  }
  componentWillMount() {
    let hidMsg = message.loading('正努力加载中...');
    Promise.all([
      wantShopData({ statements: this.state.statements }),
      wantShopData({ statements: this.state.statementsCart })
    ]).then(([res1, res2]) => {
      let dset = toHeavyFn(res1, 'product_id');
      dset.length = 8;
      this.setState({
        productData: dset,
        data: res2,
        totalData: res2,
        cartLength: res2.length
      }, hidMsg);
    });
  }
  componentWillReceiveProps(nextProps) {
    if(nextProps !== this.props) {
      let sum = 0, tdata = [], shopTotal = nextProps.shopTotal;
      this.state.data.forEach(dItem => {
        shopTotal.forEach(tItem => {
          if(dItem.shop_id === tItem.shopId) {
            dItem.shop_val = parseFloat(tItem.singSum) / parseFloat(dItem.shop_pri)
          }
        });
        tdata.push(dItem);
      });
      shopTotal.forEach(item => {
        sum += parseFloat(item.singSum);
      });
      this.setState({
        totalData: tdata,
        totalMsg: {
          total: sum,
          len: shopTotal.length,
          isLength: this.state.cartLength === shopTotal.length
        }
      });
    }else {
      return false;
    }
  }

  allShopOption(isSelect) {
    let sum = 0;
    if(isSelect) { // 全选
      this.state.totalData.forEach(item => {
        sum += parseFloat(item.shop_pri) * item.shop_val;
      });
      this.setState({
        totalMsg: {
          total: sum,
          len: this.state.data.length,
          isLength: true
        }
      });
    }else { // 取消全选
      this.setState({
        totalMsg: {
          total: sum,
          len: 0,
          isLength: false
        }
      });
    }
  }

  render() {
    return (
      <div className="user-shop_cart">
        <Header />
        <div className="content">
          <div className="user-cart">
            <ShopCartList shopData={ this.state.data }/>
          </div>
          <UserShopTotal
            onChange={ this.allShopOption }
            totalMsg={ this.state.totalMsg }
          />
          <RemShop productData={ this.state.productData }/>
        </div>
        <Footer />
      </div>
    )
  }
}
export default connect(mapStateToProps)(UserShopCart);