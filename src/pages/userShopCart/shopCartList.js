import React, { Component } from 'react';
import SingCartShop from "./singCartShop/singCartShop";
import NotData from '../../comment/notData/notData';
import { message } from 'antd';
import { wantShopData } from "../../api/shopApi";

import './shopCartList.scss';

class ShopCartList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      shopData: [],
      isNeed: true
    };
    this.operationSingle = this.operationSingle.bind(this);
  }
  componentWillReceiveProps(nextProps) {
    if(this.state.isNeed) { // 防止数据在每次改变是重复渲染
      this.setState({
        shopData: nextProps.shopData,
        isNeed: false
      });
    }
  }
  operationSingle(type, shopMsg) {
    let hidMsg = message.loading('请稍后...');
    let shopData = this.state.shopData.filter(item => item.shop_id !== shopMsg);
    let deleShopVal = this.state.shopData.filter(item => item.shop_id === shopMsg)[0].shop_val;
    this.setState({
      shopData
    });
    /*
    * 删除数据：delete from 表名 where id = ?
    * 更改数据：update 表名 set 字段1 = ?,字段2 = ?,字段3 = ? where id = ?
    * 当删除完购物车数据后，商品表中需加上购物车中商品数量
    * 加之前得先查商品库存数量
    * */
    let statementsDelete = `DELETE FROM userCart WHERE shop_id = '${shopMsg}'`;
    let statementsQuery = `SELECT * FROM shopMsg WHERE shop_id = '${shopMsg}'`;
    Promise.all([
      wantShopData({statements: statementsDelete}),
      wantShopData({statements: statementsQuery})
    ]).then(([res1, res2]) => {
      let shopNum = res2[0].shop_Num + deleShopVal;
      let statementsUpdate = `UPDATE shopMsg set shop_Num = ${shopNum} WHERE shop_id = '${shopMsg}'`;
      wantShopData({statements: statementsUpdate}).then(data => {
        hidMsg();
        message.success('已成功将该商品从您的购物车中移除');
      }, hidMsg);
    }).catch(hidMsg);
  }
  render() {
    let notData = null;
    if(this.state.shopData.length === 0) {
      notData = (<NotData promptTxt="购物车空空如也~~"/>);
    }
    return (
      <div className="shop-cart_list">
        <ul className="cart-list">
          {
            this.state.shopData.map(singItem => (
              <SingCartShop
                singData={ singItem }
                key={ singItem.shop_id }
                onChange={
                  this.operationSingle
                }
              />
            ))
          }
        </ul>
        { notData }
      </div>
    )
  }
}

export default ShopCartList;