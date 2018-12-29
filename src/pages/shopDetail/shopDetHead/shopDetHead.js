import React, { Component } from 'react';
import { Button } from 'antd';
import './shopDetHead.scss';

export default class ShopDetHead extends Component {
  constructor(props) {
    super(props);
    this.state = {
      productGenre: [],
      productDet: [],
      defaultImg: null,
      defaultInv: null,
      productName: null,
      productPri: null,
      productTxt: null,
      seleIndex: 0
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      productGenre: nextProps.data.product_genre,
      productDet: nextProps.data.product_det,
      defaultImg: nextProps.data.product_genre[0].img,
      defaultInv: nextProps.data.product_genre[0].value,
      productName: nextProps.data.product_name,
      productPri: (+nextProps.data.product_pri).toFixed(2),
      productTxt: nextProps.product_txt
    })
  }

  seleShowImgFn(that, e) {
    let target = e.target;
    let seleIndex = +target.getAttribute('data-index');
    that.setState({
      seleIndex,
      defaultImg: that.state.productGenre[seleIndex].img
    });
  }

  render() {
    return (
      <div className="shop-det_head">
        <div className="content">
          <div className="det-head_left">
            <div className="left-con">
              <div className="con-show_img">
                <img src={ this.state.defaultImg } alt=""/>
              </div>
            </div>
            <div className="left-foo">
              <ul className="con-img_list" onClick={ (e) => this.seleShowImgFn(this, e) }>
                {
                  this.state.productGenre.map((item, index) => (
                    <li key={ index } className={ this.state.seleIndex === index ? 'set-li' : ''}>
                      <img src={ item.img } data-id={ item.id } data-index={ index }/>
                    </li>
                  ))
                }
              </ul>
            </div>
          </div>
          <div className="det-head_right">
            <div className="right-head">
              <h5>{ this.state.productName }</h5>
              <p>{ this.state.productTxt }</p>
            </div>
            <div className="right-con">
              <h5 className="price">
                { this.state.productPri }元
                <span className="inventory">库存{ this.state.defaultInv }件</span>
              </h5>
            </div>
            <div className="right-foo">
              <Button type="primary">加入购物车</Button>
              <Button>加入收藏</Button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}