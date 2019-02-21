import React, { Component } from 'react';
import { connect } from 'react-redux';
import { userSubShop, userAddShop } from '../../../reduxs/action';
import './opShopNum.scss';
import {wantShopData} from "../../../api/shopApi";

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
    this.updaterShopInventory = this.updaterShopInventory.bind(this);
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
        this.updaterShopInventory('REDUC');
        this.props.onChange(this.state.shopNum, this.state.shopPrice);
      });
    }
  }
  addShopNum() {
    console.log(this.props.data);
    this.props.addShopNum(this.props.data.shop_id);
    this.state.shopNum ++;
    this.setState({
      shopNum: this.state.shopNum
    }, () => {
      this.updaterShopInventory('ADD');
      this.props.onChange(this.state.shopNum, this.state.shopPrice);
    });
  }
  updaterShopInventory(optionType) {
    // 先查到商品的库存数量 this.state.addShopVal
    let allStatements = `select * from shopMsg where product_id=? and shop_id=?`;
    let allParameter = JSON.stringify([
      this.props.data.product_id,
      this.props.data.shop_id
    ]);
    wantShopData({ statements: allStatements, parameter: allParameter }).then(data => {
      // 查询成功后再进行更新数据操作
      let remainNum = null; // 总数量 +或- 加入购物车数量
      if(optionType === 'ADD') {
        remainNum = data[0].shop_Num - 1;
      }
      if(optionType === 'REDUC') {
        remainNum = data[0].shop_Num + 1;
      }
      let statements = `update shopMsg set shop_Num=? where product_id=? and shop_id=?`;
      let parameter = JSON.stringify([
        remainNum,
        this.props.data.product_id,
        this.props.data.shop_id
      ]);
      wantShopData({ statements, parameter }).then(() => {});
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