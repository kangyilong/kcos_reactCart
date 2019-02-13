import React, { Component } from 'react';
import { connect } from 'react-redux';
import { operationAllShop } from '../../reduxs/action';
import { Button } from 'antd';

import './userShopTotal.scss';

function mapStateToProps(state) {
  return {
    cartShopData: state.userCartData
  };
}

function mapDispatchToProps(dispatch) {
  return {
    selectStatus(seleStatus) {
      dispatch(operationAllShop(seleStatus))
    }
  }
}

class UserShopTotal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      optxt: '取消全选',
      totalMsg: {}
    };
    this.selectAllShop = this.selectAllShop.bind(this);
  }
  componentWillReceiveProps(nextProps) {
    let shopLen = 0, shopTotal = 0;
    nextProps.cartShopData.forEach(item => {
      if(item.isSelected) {
        shopLen ++;
        shopTotal += parseFloat(item.shop_pri) * parseFloat(item.shop_val);
      }
    });
    this.setState({
      totalMsg: {
        len: shopLen,
        total: shopTotal
      },
      optxt: shopLen === nextProps.cartShopData.length ? '取消全选' : '全 选'
    });
  }
  selectAllShop() {
    if(this.state.optxt === '全 选') {
      this.props.selectStatus('SELECTED_S');
      this.setState({
        optxt: '取消全选'
      });
    }else {
      this.props.selectStatus('CANCEL_S');
      this.setState({
        optxt: '全 选'
      });
    }
  }
  render() {
    return (
      <div className="user-shop_total">
        <div className="left">
          <Button onClick={ this.selectAllShop }>{this.state.optxt}</Button>
        </div>
        <div className="right">
          <p>共 <span>{ this.state.totalMsg.len ? this.state.totalMsg.len : 0 }</span> 件商品，合计：<span>{ this.state.totalMsg.total ? this.state.totalMsg.total.toFixed(2) : 0.00 }</span> 元</p>
          <div className="r-btn">
            <Button type="primary">去结算</Button>
          </div>
        </div>
      </div>
    );
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(UserShopTotal);