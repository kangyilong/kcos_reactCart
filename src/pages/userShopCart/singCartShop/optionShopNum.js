import React, { Component } from 'react';
import './opShopNum.scss';

export default class OptionShopNum extends Component {
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
      });
    }
  }
  reducShopNum() {
    if(this.state.shopNum > 1) {
      this.state.shopNum --;
      this.setState({
        shopNum: this.state.shopNum
      }, () => {
        this.props.onChange(this.state.shopNum, this.state.shopPrice);
      });
    }
  }
  addShopNum() {
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