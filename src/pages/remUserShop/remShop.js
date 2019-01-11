import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import './remShop.scss';

class RemShop extends Component {
  constructor(props) {
    super(props);
  }
  // 点击查看详情
  shopClickFn(that, productId) {
    that.props.history.push(`/shopDet?shopId=${ productId }`);
  }
  render() {
    return (
      <div className="rem-shop">
        <div className="success-tit">
          <h4>购买了该商品的用户还购买了</h4>
        </div>
        <div className="success-con">
          <ul className="shop-list">
            {
              this.props.productData.map((item, index) => (
                <li key={ index } onClick={ () => this.shopClickFn(this, item.product_id) }>
                  <div className="single-head">
                    <img src={ item.product_genre.img } alt=""/>
                  </div>
                  <h5>{ item.product_name }</h5>
                  <p>{ item.product_pri }</p>
                </li>
              ))
            }
          </ul>
        </div>
      </div>
    )
  }
}
export default withRouter(RemShop)