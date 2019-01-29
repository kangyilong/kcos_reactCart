import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

class singShop extends Component {
  constructor(props) {
    super(props);
    this.state = {
      setSlot: 0,
      defaultName: props.data[0].shop_name,
      defaultTxt: props.data[0].shop_txt,
      defaultPri: props.data[0].shop_pri
    };
  }
  setSpanFn(spanIndex) {
    window.event.stopPropagation();
    this.setState({
      setSlot: spanIndex,
      defaultName: this.props.data[spanIndex].shop_name,
      defaultTxt: this.props.data[spanIndex].shop_txt,
      defaultPri: this.props.data[spanIndex].shop_pri
    });
  }
  toShopCart(productId) {
    if(window.event.target.tagName === 'SPAN') {
      return;
    }
    this.props.history.push(`/shopDet?productId=${ productId }`);
  }
  render() {
    return (
      <li className={this.props.type === '1' ? 'sing-li' : 'sing-li sing02-li'} onClick={ this.toShopCart.bind(this, this.props.data[0].product_id) }>
        <div className="sing-head">
          <ul className="head-img">
            {
              this.props.data.map((picItem, picIndex) => (
                <li
                  style={ {'backgroundImage': `url(${picItem.shop_pic})`} }
                  className={this.state.setSlot === picIndex ? '' : 'none'}
                  key={ picIndex }>
                </li>
              ))
            }
          </ul>
          <div className="slot-box">
            {
              this.props.data.map((picSpan, spanIndex) => (
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
          <h5>{ this.state.defaultName }</h5>
          <p className="tit" title={ this.state.defaultTxt }>{ this.state.defaultTxt }</p>
          <p className="tal-btn">
            <span className="price">{ this.state.defaultPri }元</span>
            <span className="btn">查看详情</span>
          </p>
        </div>
      </li>
    )
  }
}

export default withRouter(singShop);
