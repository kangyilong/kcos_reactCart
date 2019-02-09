import React, { Component } from 'react';
import { Button } from 'antd';
import OptionShopNum from './optionShopNum';
import { connect } from 'react-redux';
import { TOGGLE_SHOP } from '../../../reduxs/visibility';
import { checkShopNumber } from "../../../reduxs/action";
import { wantShopData } from "../../../api/shopApi";

function mapStateToProps(state) {
  return {
    allShopData: state
  }
}

function mapDispatchToProps(dispatch) {
  return {
    shopTotalFn(type, shopId) {
      dispatch(checkShopNumber(type, shopId));
    }
  }
}

class SingCartShop extends Component{
  constructor(props) {
    super(props);
    this.state = {
      shopVal: +props.singData.shop_val, // 购物车商品数量
      statements: `SELECT * FROM shopMsg WHERE shop_id = '${props.singData.shop_id}'`,
      shopSum: 0,  // 最后商品单总价
      singData: {},  // 该条商品信息
      isChecked: true,
      isNo: true
    };
    this.getChildData = this.getChildData.bind(this);
    this.selectCheckFn = this.selectCheckFn.bind(this);
  }
  componentWillMount() {
    wantShopData({ statements: this.state.statements }).then(data => {
      this.setState({
        singData: data[0],
        shopSum: (+data[0].shop_pri * this.state.shopVal).toFixed(2)
      });
    });
  }
  getChildData(newShopNum, price) { // 得到该商品的总价
    this.setState({
      shopSum: (newShopNum * price).toFixed(2)
    })
  }
  componentWillReceiveProps(nextProps) {
    if(this.state.isNo) {
      this.setState({
        isChecked: this.props.singData.isSelected,
        isNo: false
      }, () => {
        setTimeout(() => {
          this.setState({
            isNo: true
          });
        }, 20);
      });
    }
  }
  selectCheckFn() {
    this.props.shopTotalFn(TOGGLE_SHOP, this.state.singData.shop_id);
  }

  render() {
    return (
      <li className="sing-li">
        <div className="children01" onClick={ this.selectCheckFn }>
          <span>
            <input type="checkbox" checked={ this.state.isChecked } readOnly/>
          </span>
        </div>
        <div className="children02">
          <div className="left">
            <img src={ this.state.singData.shop_pic } alt=""/>
          </div>
          <div className="right">
            <p>{ this.state.singData.shop_name }</p>
          </div>
        </div>
        <div className="children03">
          <OptionShopNum  data={ this.state.singData } shopVal={ this.state.shopVal } onChange={ this.getChildData }/>
        </div>
        <div className="children04">
          共：<span>{ this.state.shopSum }</span>元
        </div>
        <div className="children05">
          <Button type="danger" onClick={ () => { this.props.onChange('delete', this.state.singData.shop_id) } }>删除</Button>
        </div>
      </li>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SingCartShop)
