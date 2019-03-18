import {wantShopData} from "../../../../../api/shopApi";

export const getOrderData = (that, hasMsg, status) => {
  // 先查订单总表
  let a_statements = `SELECT code, shop_total, shop_sum, zf_type, o_time FROM userOrder WHERE o_status='${status}' AND user_id='${that.state.user_id}'`;
  wantShopData({statements: a_statements}).then(data => {
    that.setState({
      orderData: data
    }, () => {
      let i = 0, len = data.length;
      for(i; i < len; i ++) {
        // 同时查订单子表和商品信息表
        let statements = `SELECT shopMsg.shop_pic, shopMsg.shop_name, shopMsg.product_id, orderMsg.order_code, orderMsg.shop_pri, orderMsg.shop_val FROM shopMsg, orderMsg WHERE orderMsg.p_code = '${data[i].code}' AND orderMsg.shop_id = shopMsg.shop_id`;
        wantShopData({statements}).then((msg) => {
          that.setState({
            shopMsg: [...that.state.shopMsg, msg]
          });
        }, hasMsg);
      }
      hasMsg();
    });
  }, hasMsg);
};