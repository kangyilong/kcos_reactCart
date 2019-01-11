import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from '../../comment/header';
import Footer from '../../comment/footer';
import RemShop from '../remUserShop/remShop';
import { Button } from 'antd';
import { getShopData } from '../../api/shopApi';
import { mapStateToProps, mapDispatchToProps } from '../../reduxs/mapDataToProps';

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
    this.props.getShopSuccessData();
    getShopData({ statements: 'SELECT * FROM shopMsg' }).then(data => {
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

  shouldComponentUpdate(nowProps) {
    if(!(nowProps === this.props)) {
      this.setState({
        shopData: Object.values(nowProps.shopDet)[0]
      }, () => {
        if(this.state.shopData) {
          this.setState({
            productGenre: JSON.parse(this.state.shopData.product_genre)
          }, () => {
            this.state.productGenre.forEach(item => {
              if(item.id === this.state.productDet.shopId) {
                this.setState({
                  productMsg: item
                });
              }
            });
          });
        }
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
                <img src={ this.state.productMsg.img } alt=""/>
              </div>
              <div className="shop-det">
                <h5>剩余数量：{ this.state.productMsg.value - 1 } 件</h5>
                <p>已成功加入购物车</p>
              </div>
            </div>
            <div className="head-right">
              <Button>继续购买</Button>
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