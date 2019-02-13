import {
  SHOP_DET,
  SELECT_ALL_SHOP,
  GET_USER_CART,
  TOGGLE_SHOP,
  ADD_SHOP,
  SUB_SHOP,
  REMOVE_SHOP
} from './visibility';
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

// 同步获取用户购物车所有数据
export function asyncUserCartData(userCartData){
  let cartData = userCartData.map(item => {
    item.isSelected = true;
    return item;
  });
  return {
    type: GET_USER_CART,
    userCartData: cartData
  }
}

// 异步获取用户购物车数据
export function getUserCarData(userId) {
  let statements = `SELECT * FROM userCart WHERE user_id = '${userId}'`;
  return (dispatch) => {
    wantShopData({ statements }).then(data => {
      dispatch(asyncUserCartData(data));
    });
  }
}

// 购物车选中或不选中
export function checkShopNumber(type, shopId) {
  return { type: TOGGLE_SHOP, shopId };
}

// 购物车全选或取消全选
export function operationAllShop(seleStatus) {
  return { type: SELECT_ALL_SHOP, seleStatus };
}

// 购物车加商品
export function userAddShop(shopId) {
  return { type: ADD_SHOP, shopId }
}

// 购物车减商品
export function userSubShop(shopId) {
  return { type: SUB_SHOP, shopId }
}

// 删除商品
export function removeCartShop(shopId) {
  return { type: REMOVE_SHOP, shopId }
}
