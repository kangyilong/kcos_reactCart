import { SHOP_DET, CHECK_SHOP_NUMBER, UNCHECK_SHOP, SELECT_ALL_SHOP } from './visibility';
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
// 选中或取消选中商品
function checkedShop(state=[], action) {
  switch(action.type) {
    case CHECK_SHOP_NUMBER:
      let isRepeat = false;
      let newState = state.map(item => {
        if(item.shopId === action.singMsg.shopId) {
          isRepeat = true;
          return {...item, ...action.singMsg}
        }else {
          return item;
        }
      });
      if(isRepeat) {
        return newState;
      }else {
        return [...state, action.singMsg];
      }
    case UNCHECK_SHOP:
      return state.filter(item => item.shopId !== action.singMsg.shopId);
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
  changeSingSum: checkedShop,
  selectAll: selectAllShop
})
//
// export default function getWantData(state=initialState, action) {
//   return {
//     shopDet: getShopDet(state.shopDet, action),
//     orderDet: getOrderDet(state.orderDet, action)
//   }
// }

