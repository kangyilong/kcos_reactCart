import React, { Component } from 'react';
import { connect } from 'react-redux';
import { userSubShop, userAddShop } from '../../../reduxs/action';
import './opShopNum.scss';

function mapDispatchToProps(dispatch) {
  return {
    addShopNum(shopId) {
      dispatch(userAddShop(shopId));
    },
    subShopNum(shopId) {
      dispatch(userSubShop(shopId));
    }
  }
}

class OptionShopNum extends Component {
  constructor(props) {
    super(props);
    this.state = {
      shopNum: 0,
      shopPrice: '',
      isNeed: true
    };
    this.reducShopNum = this.reducShopNum.bind(this);
    this.addShopNum = this.addShopNum.bind(this);
  }
  componentWillReceiveProps(nextProps) {
    if(this.state.isNeed) { // 防止数据在每次改变是重复渲染
      this.setState({
        shopNum: nextProps.shopVal,
        shopPrice: nextProps.data.shop_pri,
        isNeed: false
      }, () => {
        setTimeout(() => {
          this.setState({
            isNeed: true
          });
        }, 16);
      });
    }
  }
  reducShopNum() {
    if(this.state.shopNum > 1) {
      this.props.subShopNum(this.props.data.shop_id);
      this.state.shopNum --;
      this.setState({
        shopNum: this.state.shopNum
      }, () => {
        this.props.onChange(this.state.shopNum, this.state.shopPrice);
      });
    }
  }
  addShopNum() {
    this.props.addShopNum(this.props.data.shop_id);
    this.state.shopNum ++;
    this.setState({
      shopNum: this.state.shopNum
    }, () => {
      this.props.onChange(this.state.shopNum, this.state.shopPrice);
    });
  }
  render() {
    return (
      <div className="op-num">
        <span className="reduc" onClick={ this.reducShopNum }>-</span>
        <span className="num">{ this.state.shopNum }</span>
        <span className="add" onClick={ this.addShopNum }>+</span>
      </div>
    )
  }
}

export default connect(null, mapDispatchToProps)(OptionShopNum);