import { getShopDetData } from "./action";

export function mapStateToProps(state) {
  return {
    shopDet: state.shopDet
  };
}
export function mapDispatchToProps(dispatch) {
  const productDet = JSON.parse(sessionStorage.getItem('productDet'));
  return {
    getShopSuccessData: () => {
      dispatch(getShopDetData(productDet.productId))
    }
  }
}