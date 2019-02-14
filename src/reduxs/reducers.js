import {
  SHOP_DET,
  SELECT_ALL_SHOP,
  GET_USER_CART,
  TOGGLE_SHOP,
  ADD_SHOP, SUB_SHOP, REMOVE_SHOP
} from './visibility';
import { combineReducers } from 'redux';

// 获取商品详情
function getShopDet(state=[], action) {
  switch(action.type) {
    case SHOP_DET:
      return {
        ...action.productData
      };
    default:
      return state;
  }
}

// 获取用户购物车商品
function getUserCartData(state=[], action) {
  switch(action.type) {
    case GET_USER_CART: // 获取购物车所有数据
      return [
        ...action.userCartData
      ];
    case TOGGLE_SHOP:  // 选中或取消选中商品
      state.map(item => {
        if(action.shopId === item.shop_id) {
          item.isSelected = !item.isSelected;
        }
      });
      return [
        ...state
      ];
    case SELECT_ALL_SHOP: // 选中或取消选中所有商品
      if(action.seleStatus === 'SELECTED_S') {
        state.map(item => {
          item.isSelected = true;
        });
      }
      if(action.seleStatus === 'CANCEL_S') {
        state.map(item => {
          item.isSelected = false;
        });
      }
      return [
        ...state
      ];
    case ADD_SHOP: // 商品 ++
      state.map(item => {
        if(item.shop_id === action.shopId) {
          item.shop_val ++;
        }
      });
      return [ ...state ];
    case SUB_SHOP: // 商品 --
      state.map(item => {
        if(item.shop_id === action.shopId) {
          item.shop_val --;
        }
      });
      return [ ...state ];
    case REMOVE_SHOP: // 移除该商品
      let remainShop = state.filter(item => item.shop_id !== action.shopId);
      return [ ...remainShop ];
    default:
      return state;
  }
}

export default combineReducers({
  shopDet: getShopDet,
  userCartData: getUserCartData
})
//
// export default function getWantData(state=initialState, action) {
//   return {
//     shopDet: getShopDet(state.shopDet, action),
//     orderDet: getOrderDet(state.orderDet, action)
//   }
// }

