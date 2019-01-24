import { getShopDetData } from "./action";

export function mapStateToProps(state) {
  return {
    shopDet: state.shopDet
  };
}
export function mapDispatchToProps(dispatch) {
  const productDet = JSON.parse(sessionStorage.getItem('productDet'));
  return {
    getShopSuccessData: (productId) => {
      dispatch(getShopDetData(productId ? productId : productDet.productId))
    }
  }
}