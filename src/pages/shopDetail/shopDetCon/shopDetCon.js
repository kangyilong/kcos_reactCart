import React, { Component } from 'react';
import { getShopData } from "../../../api/shopApi";
import { withRouter } from 'react-router-dom';

import './shopDetCon.scss';

class ShopDetCon extends Component {
  constructor(props) {
    super(props);
    this.state = {
      shopDetIntro: [],
      shopList: []
    };
    this.getParams = {
      statements: 'SELECT * FROM shopMsg'
    };
  }

  componentWillMount() {
    getShopData(this.getParams).then(data => {
      data.map(item => {
        item.product_genre = JSON.parse(item.product_genre);
        item.product_det = JSON.parse(item.product_det);
        item.product_pri = item.product_pri.toFixed(2);
      });
      data.length = 5;
      this.setState({
        shopList: data
      });
    });
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      shopDetIntro: nextProps.data
    });
  }

  // 选择商品查看详情
  onClickShopFn(that, e) {
    let target = e.target;
    let shopId = target.getAttribute('data-id');
    that.props.history.push(`/shopDet?shopId=${ shopId }`);
    window.location.reload();
    setTimeout(() => {
      window.scrollTo(0, 0);
    }, 100);
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
                    <img src={ item.product_genre[0].img } data-id={ item.product_id }/>
                  </div>
                  <div className="intro-con">
                    <h5>{ item.product_name }</h5>
                    <p>{ item.product_pri }</p>
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

export default withRouter(ShopDetCon);