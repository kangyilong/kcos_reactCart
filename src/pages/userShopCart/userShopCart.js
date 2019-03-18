import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import Header from '../../comment/header';
import Footer from '../../comment/footer';
import RemShop from '../remUserShop/remShop';
import { Table, Button, message } from 'antd';
import ShopCartList from './shopCartList';
import UserShopTotal from './userShopTotal';
import { getUserCarData } from '../../reduxs/action';
import { wantShopData } from '../../api/shopApi';
import { toHeavyFn, isLogin, getUserId } from "../../comment/methods/util";

import './userShopCart.scss';

function mapStateToProps(state) {
  return {
    cartShopData: state.userCartData
  };
}

function mapDispatchToProps(dispatch) {
  return {
    userCartDataFn(userId) {
      dispatch(getUserCarData(userId));
    }
  }
}

class UserShopCart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      u_login: null,
      productData: [],
      data: [],
      totalData: [], // 全选后总价
      cartLength: 0,
      statements: 'SELECT * FROM shopMsg'
    };
  }
  async componentWillMount() {
    let hidMsg = message.loading('正努力加载中...');
    this.setState({
      u_login: !!(await isLogin()).length
    }, () => {
      if(this.state.u_login) {
        this.props.userCartDataFn(getUserId());
        Promise.all([
          wantShopData({ statements: this.state.statements })
        ]).then(([res1]) => {
          let dset = toHeavyFn(res1, 'product_id');
          dset.length = 8;
          this.setState({
            productData: dset
          }, hidMsg);
        });
      }else {
        hidMsg();
        message.warning('您还未登录哦，即将前往登录页...', 1.5).then(() => {
          this.props.history.push('login');
        });
      }
    });
  }
  componentWillReceiveProps(nextProps) {
    if(nextProps !== this.props) {
      this.setState({
        data: Object.values(nextProps.cartShopData)
      });
      let sum = 0;
      let nextArr = nextProps.cartShopData.filter(item => item.isSelected);
      nextArr.forEach(item => {
        sum += parseFloat(item.shop_pri) * item.shop_val;
      });
    }else {
      return false;
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
          <UserShopTotal />
          <RemShop productData={ this.state.productData }/>
        </div>
        <Footer />
      </div>
    )
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(UserShopCart);