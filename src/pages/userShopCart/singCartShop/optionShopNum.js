import React, { Component } from 'react';
import './opShopNum.scss';

export default class OptionShopNum extends Component {
  constructor(props) {
    super(props);
    this.state = {
      shopNum: props.data.shopNumber
    }
    this.reducShopNum = this.reducShopNum.bind(this);
    this.addShopNum = this.addShopNum.bind(this);
  }
  reducShopNum() {
    if(this.state.shopNum > 1) {
      this.state.shopNum --;
      this.setState({
        shopNum: this.state.shopNum
      }, () => {
        this.props.onChange(this.state.shopNum, this.props.data.shopPrice);
      });
    }
  }
  addShopNum() {
    this.state.shopNum ++;
    this.setState({
      shopNum: this.state.shopNum
    }, () => {
      this.props.onChange(this.state.shopNum);
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