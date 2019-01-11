import React from 'react';
import { Button } from 'antd';
import OptionShopNum from './optionShopNum';

const SingCartShop = ({ singData }) => (
  <li className="sing-li">
    <div className="children01">
      <span>
        <input type="checkbox"/>
      </span>
    </div>
    <div className="children02">
      <div className="left">
        <img src="" alt=""/>
      </div>
      <div className="right">
        <p>商品名称</p>
      </div>
    </div>
    <div className="children03">
      <OptionShopNum  data={ singData } onChange={ getChildData }/>
    </div>
    <div className="children04">
      <span>123.00元</span>
    </div>
    <div className="children05">
      <Button type="danger">删除</Button>
    </div>
  </li>
);

function getChildData(newShopNum, price) {

}

export default SingCartShop;