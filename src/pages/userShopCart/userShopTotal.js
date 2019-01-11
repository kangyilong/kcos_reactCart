import React from 'react';
import { Button } from 'antd';

import './userShopTotal.scss';

const UserShopTotal = () => (
  <div className="user-shop_total">
    <div className="left">
      <Button>全选</Button>
    </div>
    <div className="right">
      <p>共 <span>0</span> 件商品，合计：<span>0.00</span> 元</p>
      <div className="r-btn">
        <Button type="primary">去结算</Button>
      </div>
    </div>
  </div>
);
export default UserShopTotal;