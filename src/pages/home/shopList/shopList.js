import React, { Component } from 'react';
import { getShopData } from '../../../api/shopApi';
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
    this.getParams = {
      statements: 'SELECT * FROM shopMsg'
    };
    // let DATA = [{"detImg":"/static/images/all/1495869803526192.jpg"}];
    // this.exitParams = {
    //   statements: 'UPDATE shopMsg SET product_det=? WHERE product_id="KY_13141544361478180"',
    //   parameter: [JSON.stringify(DATA)]
    // };
    // product_genre  product_det
    this.toLeft = this.toLeft.bind(this);
    this.toRight = this.toRight.bind(this);
  }
  componentWillMount() {
    getShopData(this.getParams).then(data => {
      data.map(item => {
        item.product_genre = JSON.parse(item.product_genre);
        item.product_det = JSON.parse(item.product_det);
      });
      data.length = 8;
      let shopData02 = JSON.parse(JSON.stringify(data));
      this.setState({
        shopData: data,
        shopData02: shopData02.splice(2, data.length)
      });
    });
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
        <div className="content">
          <div className="shop-list01">
            <CompontHead type="shopList" data={ {tit: '热门产品', txt: 'Hot'} }/>
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
        <div className="content">
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
