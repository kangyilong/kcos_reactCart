import React, { Component } from 'react';
import { wantShopData } from "../../../api/shopApi";
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { getQueryString, toHeavyFn } from '../../../comment/methods/util';
import { mapStateToProps, mapDispatchToProps } from '../../shopSuccess/mapDataToProps';

import './shopDetCon.scss';

class ShopDetCon extends Component {
  constructor(props) {
    super(props);
    this.state = {
      shopDetIntro: [],
      shopList: [],
      statementsDet: `SELECT * FROM productMsg where product_id="${ getQueryString('productId') }"`
    };
    this.getParams = {
      statements: 'SELECT * FROM shopMsg'
    };
  }

  componentWillMount() {
    wantShopData({ statements: this.state.statementsDet }).then(data => {
      this.setState({
        shopDetIntro: JSON.parse(data[0].product_det)
      });
    });
    wantShopData(this.getParams).then(data => {
      let dset = toHeavyFn(data, 'product_id');
      dset.length = 5;
      this.setState({
        shopList: dset
      });
    });
  }

  // 选择商品查看详情
  onClickShopFn(that, e) {
    let target = e.target;
    let productId = target.getAttribute('data-id');
    that.props.history.push(`/shopDet?productId=${ productId }`);
    that.props.getShopDetail(productId);
  }

  render() {
    return (
      <div className="shop-det_con">
        <div className="con-content">
          <div className="con-head">
            <p>产品信息</p>
          </div>
          <div className="con-box">
            {
              this.state.shopDetIntro.map((item, index) => (
                <div key={ index }>
                  <img src={ item.detImg } alt=""/>
                </div>
              ))
            }
          </div>
        </div>
        <div className="con-slider">
          <div className="con-head">
            <p className="other">其他商品</p>
          </div>
          <ul className="det-intro" onClick={ (event) => this.onClickShopFn(this, event) }>
            {
              this.state.shopList.map((item, index) => (
                <li key={ index }>
                  <div className="intro-head">
                    <img src={ item.shop_pic } data-id={ item.product_id }/>
                  </div>
                  <div className="intro-con">
                    <h5>{ item.shop_name }</h5>
                    <p>{ item.shop_pri }</p>
                  </div>
                </li>
              ))
            }
          </ul>
        </div>
      </div>
    )
  }
}

const compose = (...fns) => {
  return fns.reduce((a, b) => (...args) => a(b(...args)));
};

const enhance = compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps)
);

export default enhance(ShopDetCon);