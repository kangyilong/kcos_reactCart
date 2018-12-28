import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

class singShop extends Component {
  constructor(props) {
    super(props);
    this.state = {
      setSlot: 0
    };
    this.toShopCart = this.toShopCart.bind(this);
  }
  setSpanFn(spanIndex) {
    this.setState({
      setSlot: spanIndex
    });
  }
  toShopCart(shopId) {
    this.props.history.push('/add');
  }
  render() {
    return (
      <li className={this.props.type === '1' ? 'sing-li' : 'sing-li sing02-li'} onClick={ this.toShopCart }>
        <div className="sing-head">
          <ul className="head-img">
            {
              this.props.data.product_genre.map((picItem, picIndex) => (
                <li
                  style={ {'backgroundImage': `url(${picItem.img})`} }
                  className={this.state.setSlot === picIndex ? '' : 'none'}
                  key={ picIndex }>
                </li>
              ))
            }
          </ul>
          <div className="slot-box">
            {
              this.props.data.product_genre.map((picSpan, spanIndex) => (
                <span
                  className={this.state.setSlot === spanIndex ? 'set-slot' : ''}
                  key={spanIndex}
                  onClick={ this.setSpanFn.bind(this, spanIndex) }>
                  </span>
              ))
            }
          </div>
        </div>
        <div className="sing-con">
          <h5>{ this.props.data.product_name }</h5>
          <p className="tit" title={ this.props.data.product_txt }>{ this.props.data.product_txt }</p>
          <p className="tal-btn">
            <span className="price">{ this.props.data.product_pri }元</span>
            <span className="btn">查看详情</span>
          </p>
        </div>
      </li>
    )
  }
}

export default withRouter(singShop);
