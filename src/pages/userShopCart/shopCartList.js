import React from 'react';
import SingCartShop from "./singCartShop/singCartShop";
import './shopCartList.scss';

const ShopCartList = ({ shopData }) => (
  <div className="shop-cart_list">
    <ul className="cart-list">
      {
        shopData.map(singItem => (
          <SingCartShop singData={ singItem } key={ singItem.shopId }/>
        ))
      }
    </ul>
  </div>
);

export default ShopCartList;