import React, { Component } from 'react';
import { Button } from 'antd';
import OptionShopNum from './optionShopNum';
import { connect } from 'react-redux';
import { CHECK_SHOP_NUMBER, UNCHECK_SHOP } from '../../../reduxs/visibility';
import { checkShopNumber } from "../../../reduxs/action";
import { wantShopData } from "../../../api/shopApi";

function mapStateToProps(state) {
  return {
    allShopStatus: state.selectAll
  }
}

function mapDispatchToProps(dispatch) {
  return {
    shopTotalFn(type, shopSum, shopId) {
      dispatch(checkShopNumber(type, shopSum, shopId));
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
      isChecked: false
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
  componentWillReceiveProps(nextProps) {
    if(nextProps !== this.props){
      this.setState({
        isChecked: nextProps.allShopStatus
      })
    }
    return true;
  }
  getChildData(newShopNum, price) { // 得到该商品的总价
    this.setState({
      shopSum: (newShopNum * price).toFixed(2)
    }, () => {
      if(this.state.isChecked) { // 选中后
        this.props.shopTotalFn(CHECK_SHOP_NUMBER, this.state.shopSum, this.state.singData.shop_id);
      }
    })
  }
  selectCheckFn() {
    this.setState({
      isChecked: !this.state.isChecked
    }, () => {
      if(this.state.isChecked) { // 选中后
        this.props.shopTotalFn(CHECK_SHOP_NUMBER, this.state.shopSum, this.state.singData.shop_id);
      }else { // 取消选中
        this.props.shopTotalFn(UNCHECK_SHOP, this.state.shopSum, this.state.singData.shop_id);
      }
    });
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
