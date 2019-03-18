import { getShopDetData } from "../../reduxs/action";

export function mapStateToProps(state) {
  return {
    shopDet: state.shopDet
  };
}
export function mapDispatchToProps(dispatch) {
  const productDet = JSON.parse(sessionStorage.getItem('productDet'));
  return {
    getShopSuccessData: (productId, shopId) => { // 查询单个商品信息
      dispatch(getShopDetData(productId ? productId : productDet.productId, shopId ? shopId : productDet.shopId))
    },
    getShopDetail: (productId) => { // 查询产品信息
      dispatch(getShopDetData(productId ? productId : productDet.productId))
    }
  }
}