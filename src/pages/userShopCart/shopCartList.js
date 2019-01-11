import React from 'react';
import SingCartShop from "./singCartShop/singCartShop";

const ShopCartList = ({ shopData }) => (
  <div className="shop-cart_list">
    <ul className="cart-list">
      {
        shopData.map(singItem => (
          <SingCartShop singData={ singItem } />
        ))
      }
    </ul>
  </div>
);

export default ShopCartList;