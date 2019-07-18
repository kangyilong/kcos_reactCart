import { getShopDetData } from "../../reduxs/action";

export function mapStateToProps(state) {
  return {
    shopDet: state.shopDet
  };
}
export function mapDispatchToProps(dispatch) {
  const productDet = JSON.parse(sessionStorage.getItem('productDet'));
  return {
    getShopSuccessData: (pId, sId) => { // 查询单个商品信息
      let productId = pId ? pId : productDet ? productDet.productId : '';
      let shopId = sId ? sId : productDet ? productDet.shopId : '';
      if(productId && shopId) {
          dispatch(getShopDetData(productId, shopId))
      }
    },
    getShopDetail: (pId) => { // 查询产品信息
        let productId = pId ? pId : productDet ? productDet.productId : '';
        if(productId) {
            dispatch(getShopDetData(productId));
        }
    }
  }
}