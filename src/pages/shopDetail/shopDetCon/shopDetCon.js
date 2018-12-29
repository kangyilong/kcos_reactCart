import React, { Component } from 'react';

import './shopDetCon.scss';

export default class ShopDetCon extends Component {
  constructor(props) {
    super(props);
    this.state = {
      shopDetIntro: []
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      shopDetIntro: nextProps.data
    });
    console.log(nextProps.data);
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
          <ul className="det-intro">
            <li></li>
          </ul>
        </div>
      </div>
    )
  }
}