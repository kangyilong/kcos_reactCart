import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from '../../comment/header';
import Footer from '../../comment/footer';
import RemShop from '../remUserShop/remShop';
import { Button, message } from 'antd';
import { wantShopData } from '../../api/shopApi';
import { toHeavyFn } from "../../comment/methods/util";
import { mapStateToProps, mapDispatchToProps } from './mapDataToProps';

import './shopSuccess.scss';

class ShopSuccess extends Component {
  constructor(props) {
    super(props);
    this.state = {
      productDet: JSON.parse(sessionStorage.getItem('productDet')) || '',
      shopData: {},
      productGenre: [],
      productMsg: {},
      productData: []
    };
  }

  componentWillMount() {
    let hidMsg = message.loading('正努力加载中...');
    this.props.getShopSuccessData();
    wantShopData({ statements: 'SELECT * FROM shopMsg' }).then(data => {
      let dset = toHeavyFn(data, 'product_id');
      dset.length = 8;
      this.setState({
        productData: dset
      }, hidMsg);
    });
  }

  shouldComponentUpdate(nowProps) {
    if(!(nowProps === this.props)) {
      this.setState({
        productMsg: Object.values(nowProps.shopDet)[0]
      });
    }
    return nowProps;
  }

  render() {
    return (
      <div className="shop-success">
        <Header />
        <div className="suc-content">
          <div className="success-head">
            <div className="head-left">
              <div className="shop-img">
                <img src={ this.state.productMsg.shop_pic } alt=""/>
              </div>
              <div className="shop-det">
                <h5>剩余数量：{ this.state.productMsg.shop_Num } 件</h5>
                <p>已成功加入购物车</p>
              </div>
            </div>
            <div className="head-right">
              <Button onClick={ () => { this.props.history.push('/home'); } }>继续购买</Button>
              <Button type="primary" onClick={ () => { this.props.history.push('/shopCart'); }}>去购物车结算</Button>
            </div>
          </div>
          <RemShop productData={ this.state.productData }/>
        </div>
        <Footer />
      </div>
    )
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(ShopSuccess);