import { SHOP_DET, PAGE_LOADING } from './visibility';
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

function pageLoading(state, action) {
  switch(action.type) {
    case PAGE_LOADING:
      return action.isLoading;
    default:
      return false;
  }
}

export default combineReducers({
  shopDet: getShopDet,
  showLoad: pageLoading
})
//
// export default function getWantData(state=initialState, action) {
//   return {
//     shopDet: getShopDet(state.shopDet, action),
//     orderDet: getOrderDet(state.orderDet, action)
//   }
// }

