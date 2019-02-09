import React, { Component } from 'react';
import { wantShopData } from '../../../api/shopApi';
import SingShop from './singShop';
import CompontHead from '../homeComHead/compontHead';

import './shoplist.scss';

export default class HomeShopList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      shopData: [],
      shopData02: []
    };
    this.conUl = React.createRef();
    this.productParams = {
      statements: 'SELECT * FROM productMsg',
      requestType: 'ALL_SHOP'
    };
    this.shopParams = {
      statements: 'SELECT * FROM shopMsg'
    };
    this.toLeft = this.toLeft.bind(this);
    this.toRight = this.toRight.bind(this);
  }
  componentWillMount() {
    Promise.all([
      wantShopData(this.productParams),
      wantShopData(this.shopParams)
    ]).then(([productData, shopData]) => {
      let data = [], data2 = [];
      productData.forEach((productItem) => {
        let arr = shopData.filter(item => item.product_id === productItem.product_id);
        data.push(arr);
        data2.unshift(arr);
      });
      data2.length = 6;
      this.setState({
        shopData: data,
        shopData02: data2
      });
    });
    // data.map(item => {
    //   item.product_genre = JSON.parse(item.product_genre);
    //   item.product_det = JSON.parse(item.product_det);
    // });
    // data.length = 8;
    // let shopData02 = JSON.parse(JSON.stringify(data));
    // this.setState({
    //   shopData: data,
    //   shopData02: shopData02.splice(2, data.length)
    // });
    // exitShopData(this.exitParams).then(data => {
    //   console.log(data);
    // });
  }
  toLeft() {
    this.conUl.current.style.marginLeft = '0%';
  }
  toRight() {
    this.conUl.current.style.marginLeft = '-100%';
  }
  render() {
    return (
      <div className='home-shoplist'>
        <div className="content wb">
          <div className="shop-list01">
            <CompontHead type="shopList" toLeft={ this.toLeft } toRight={ this.toRight } data={ {tit: '热门产品', txt: 'Hot'} }/>
            <div className="list-con">
              <ul className="con-ul" ref={ this.conUl }>
                {
                  this.state.shopData.map((item, index) => (
                    <SingShop data={ item } key={ index } type='1'/>
                  ))
                }
              </ul>
            </div>
          </div>
        </div>
        <div className="content wb">
          <div className="shop-list02">
            <CompontHead type="shop" data={ {tit: '官方精品', txt: 'Official'} }/>
            <div className="list-con list02-con">
              <ul className="con-ul con02-ul">
                <div className="list02-pic"></div>
                {
                  this.state.shopData02.map((item, index) => (
                    <SingShop data={ item } key={ index } type='2'/>
                  ))
                }
              </ul>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
