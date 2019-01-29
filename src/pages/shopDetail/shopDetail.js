import React, { Component } from 'react';
import ShopDetHead from "./shopDetHead/shopDetHead";
import ShopDetCon from "./shopDetCon/shopDetCon";
import Header from "../../comment/header";
import Footer from "../../comment/footer";

import './shopDetail.scss';

export default class ShopDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      productData: [],
      productDet: []
    };
  }

  render() {
    return (
      <div className="shop-detail">
        <Header />
        <div className="contain">
          <ShopDetHead />
          <ShopDetCon data={ this.state.productDet }/>
        </div>
        <Footer />
      </div>
    )
  }
}