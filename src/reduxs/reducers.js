import {SHOP_DET, SELECT_ALL_SHOP, GET_USER_CART, TOGGLE_SHOP } from './visibility';
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
    case GET_USER_CART:
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
    default:
      return state;
  }
}

function selectAllShop(state = [], action) {
  switch(action.type) {
    case SELECT_ALL_SHOP:
      return action.seleStatus;
    default:
      return state;
  }
}

export default combineReducers({
  shopDet: getShopDet,
  selectAll: selectAllShop,
  userCartData: getUserCartData
})
//
// export default function getWantData(state=initialState, action) {
//   return {
//     shopDet: getShopDet(state.shopDet, action),
//     orderDet: getOrderDet(state.orderDet, action)
//   }
// }

