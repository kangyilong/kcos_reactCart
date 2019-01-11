import { SHOP_DET, ORDER_DET } from './visibility';
import { combineReducers } from 'redux';

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

export default combineReducers({
  shopDet: getShopDet
})
//
// export default function getWantData(state=initialState, action) {
//   return {
//     shopDet: getShopDet(state.shopDet, action),
//     orderDet: getOrderDet(state.orderDet, action)
//   }
// }

