import {wantShopData} from "../../../../../api/shopApi";
import {getUserId} from '../../../../../comment/methods/util.js';

const user_id = getUserId();

export const getOrderData = (that, hasMsg, status, current = 1, pageSize = 10) => {
  // 先查订单总表
  let statements = `SELECT count(*) AS total FROM userOrder WHERE o_status='${status}' AND user_id='${user_id}'`;
  wantShopData({statements}).then(data => {
    that.setState({
      total: data[0].total
    })
  });
  let a_statements = `SELECT code, shop_total, shop_sum, zf_type, o_time FROM userOrder WHERE o_status='${status}' AND user_id='${user_id}' limit ${(current - 1) * pageSize},${current * pageSize}`;
  wantShopData({statements: a_statements}).then(data => {
    that.setState({
      orderData: data,
      shopMsg: []
    }, () => {
      let i = 0, len = data.length;
      for(i; i < len; i ++) {
        // 同时查订单子表和商品信息表
        let statements = `SELECT shopMsg.shop_pic, shopMsg.shop_name, shopMsg.product_id, orderMsg.order_code, orderMsg.shop_pri, orderMsg.shop_val FROM shopMsg, orderMsg WHERE orderMsg.p_code = '${data[i].code}' AND orderMsg.shop_id = shopMsg.shop_id`;
        wantShopData({statements}).then((msg) => {
          that.setState({
            shopMsg: [...that.state.shopMsg, msg]
          }, () => {
            window.scrollTo(0, 0);
          });
        }, hasMsg);
      }
      hasMsg();
    });
  }, hasMsg);
};