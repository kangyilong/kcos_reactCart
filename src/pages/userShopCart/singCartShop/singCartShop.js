import React, { Component } from 'react';
import { Button } from 'antd';
import OptionShopNum from './optionShopNum';

export default class SingCartShop extends Component{
  constructor(props) {
    super(props);
    this.state = {
      shopSum: (+props.singData.shopPrice * +props.singData.shopNumber).toFixed(2)
    };
    this.getChildData = this.getChildData.bind(this);
  }
  getChildData(newShopNum, price) {
    this.setState({
      shopSum: (newShopNum * price).toFixed(2)
    })
  }
  render() {
    return (
      <li className="sing-li">
        <div className="children01">
      <span>
        <input type="checkbox"/>
      </span>
        </div>
        <div className="children02">
          <div className="left">
            <img src={ this.props.singData.shopImg } alt=""/>
          </div>
          <div className="right">
            <p>{ this.props.singData.shopName }</p>
          </div>
        </div>
        <div className="children03">
          <OptionShopNum  data={ this.props.singData } onChange={ this.getChildData }/>
        </div>
        <div className="children04">
          共：<span>{ this.state.shopSum }</span>元
        </div>
        <div className="children05">
          <Button type="danger">删除</Button>
        </div>
      </li>
    );
  }
}
