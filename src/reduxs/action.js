import { SHOP_DET, SELECT_ALL_SHOP } from './visibility';
import { wantShopData } from '../api/shopApi';

export function getShopDet(productData) { // 获取商品的详情
  return { type: SHOP_DET, productData }
}

export function getShopDetData(productId, shopId) {
  return (dispatch) => {
    let statements = `SELECT * FROM shopMsg where product_id="${ productId }" and shop_id="${ shopId }"`;
    wantShopData({ statements }).then(data => {
      dispatch(getShopDet(data));  // 数据请求成功后dispatch getShopDet，从而在getShopDet中拿到请求成功后数据
    });
  }
}

// 购物车选中或不选中
export function checkShopNumber(type, singSum, shopId) {
  return { type, singMsg: { singSum, shopId } };
}

// 购物车全选或取消全选
export function operationAllShop(seleStatus) {
  return { type: SELECT_ALL_SHOP, seleStatus };
}
