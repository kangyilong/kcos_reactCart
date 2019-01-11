import React, { Component } from 'react';
import ShopDetHead from "./shopDetHead/shopDetHead";
import ShopDetCon from "./shopDetCon/shopDetCon";
import Header from "../../comment/header";
import Footer from "../../comment/footer";
import { getShopData } from "../../api/shopApi";
import { getParamUrl } from '../../comment/methods/util';

import './shopDetail.scss';

export default class ShopDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      statements: null,
      productData: {}
    };
  }

  componentWillMount() {
    this.setState({
      statements: `SELECT * FROM shopMsg where product_id="${ getParamUrl('shopId') }"`
    }, () => {
      getShopData({
        statements: this.state.statements
      }).then(data => {
        data.map(item => {
          item.product_genre = JSON.parse(item.product_genre);
          item.product_det = JSON.parse(item.product_det);
        });
        this.setState({
          productData: data[0]
        });
      });
    });
  }

  render() {
    return (
      <div className="shop-detail">
        <Header />
        <div className="contain">
          <ShopDetHead data={ this.state.productData }/>
          <ShopDetCon data={ this.state.productData.product_det }/>
        </div>
        <Footer />
      </div>
    )
  }
}