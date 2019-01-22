import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import Header from '../../comment/header';
import Footer from '../../comment/footer';
import RemShop from '../remUserShop/remShop';
import ShopCartList from './shopCartList';
import UserShopTotal from './userShopTotal';
import { Table } from 'antd';
import { Button } from 'antd';
import { getShopData } from '../../api/shopApi';

import './userShopCart.scss';

class UserShopCart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      productData: [],
      data: [{
        shopId: '1',
        shopName: 'John Brown',
        shopPrice: 32,
        shopNumber: 1,
        shopImg: '/static/images/y5.png'
      }, {
        shopId: '2',
        shopName: 'Jim Green',
        shopPrice: 42,
        shopNumber: 2,
        shopImg: '/static/images/y5.png'
      }, {
        shopId: '3',
        shopName: 'Joe Black',
        shopPrice: 32,
        shopNumber: 3,
        shopImg: '/static/images/y5.png'
      }, {
        shopId: '4',
        shopName: 'Disabled User',
        shopPrice: 99,
        shopNumber: 4,
        shopImg: '/static/images/y5.png'
      }]
    };
  }
  componentWillMount() {
    getShopData({statements: 'SELECT * FROM shopMsg'}).then(data => {
      data.map(item => {
        item.product_genre = JSON.parse(item.product_genre)[0];
        item.product_pri = item.product_pri.toFixed(2) + '元';
      });
      data.length = 8;
      this.setState({
        productData: data
      })
    });
  }

  render() {
    return (
      <div className="user-shop_cart">
        <Header />
        <div className="content">
          <div className="user-cart">
            <ShopCartList  shopData={ this.state.data }/>
          </div>
          <UserShopTotal />
          <RemShop productData={ this.state.productData }/>
        </div>
        <Footer />
      </div>
    )
  }
}
export default withRouter(UserShopCart);