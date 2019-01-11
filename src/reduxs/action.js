import { SHOP_DET, ORDER_DET } from './visibility';
import { getShopData } from '../api/shopApi';

export function getShopDet(productData) {
  return { type: SHOP_DET, productData }
}

export function getShopDetData(productId) {
  return (dispatch) => {
    let statements = `SELECT * FROM shopMsg where product_id="${ productId }"`;
    getShopData({ statements }).then(data => {
      dispatch(getShopDet(data));  // 数据请求成功后dispatch getShopDet，从而在getShopDet中拿到请求成功后数据
    });
  }
}

export function getOrderDet(orderId) {
  return { type: ORDER_DET, orderId }
}