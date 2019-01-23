/* eslint-disable no-unused-expressions */
import React, { Component } from 'react';
import { Button, message } from 'antd';
import { getQueryString, isLogin } from '../../../comment/methods/util';
import { withRouter } from 'react-router-dom';
import {
  shopJudgeCollection,
  addUserShopCart,
  addUserCollection,
  removeShopCollection
} from '../../../api/userApi';
import './shopDetHead.scss';

class ShopDetHead extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: sessionStorage.getItem('isLogin'),
      productGenre: [],
      productDet: [],
      defaultImg: null,
      defaultInv: null,
      productName: null,
      productPri: null,
      productTxt: null,
      seleIndex: 0,
      shopId: null,
      collectionTxt: '',
      isCollection: true,
      productId: getQueryString('shopId') // 产品ID
    };
    this.addShopCartFn = this.addShopCartFn.bind(this);
    this.addCollectionFn = this.addCollectionFn.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      productGenre: nextProps.data.product_genre,
      productDet: nextProps.data.product_det,
      defaultImg: nextProps.data.product_genre[0].img,
      defaultInv: nextProps.data.product_genre[0].value,
      productName: nextProps.data.product_name,
      productPri: (+nextProps.data.product_pri).toFixed(2),
      productTxt: nextProps.product_txt,
      shopId: nextProps.data.product_genre[0].id
    }, () => {
      this.isJudgeShop();
    });
  }

  isJudgeShop() {
    if(isLogin()) {
      let statements = `select * from userCollection where userId=? and product_id=? and shopId=?`;
      let parameter = JSON.stringify([
        this.state.userId,
        this.state.productId,
        this.state.shopId
      ]);
      let hisMsg = message.loading('');
      shopJudgeCollection({statements, parameter}).then(data => {
        hisMsg();
        if(data && data.length > 0) {
          this.setState({
            collectionTxt: '取消收藏',
            isCollection: false
          });
        }else {
          this.setState({
            collectionTxt: '加入收藏'
          })
        }
      }, hisMsg);
    }else {
      this.setState({
        collectionTxt: '加入收藏'
      })
    }
  }

  seleShowImgFn(that, e) {
    let target = e.target;
    if(target.tagName.toLowerCase() === 'img') {
      let seleIndex = +target.getAttribute('data-index');
      let shopId = target.getAttribute('data-id');
      that.setState({
        seleIndex,
        shopId,
        defaultImg: that.state.productGenre[seleIndex].img
      }, () => {
        this.isJudgeShop();
      });
    }
  }

  addShopCartFn() { // 加入购物车操作
    let productId = this.state.productId;
    let shopId = this.state.shopId;
    let params = this.addUserTable('userCart', productId, shopId);
    let hisMsg = message.loading('请稍后...');
    addUserShopCart(params).then(data => {
      hisMsg();
      if(data.msg === 'ok') {
        message.success('加入购物车成功').then(() => {
          sessionStorage.setItem('productDet', JSON.stringify({productId, shopId}));
          this.props.history.push('/addShop');
        });
      }
    }, hisMsg);
  }
  addCollectionFn() { // 加入收藏操作
    let hisMsg = message.loading('请稍后...');
    if(this.state.isCollection) {
      let params = this.addUserTable('userCollection', this.state.productId, this.state.shopId);
      addUserCollection(params).then(data => {
        hisMsg();
        if(data.msg === 'ok') {
          message.success('加入收藏成功');
          this.setState({
            collectionTxt: '取消收藏',
            isCollection: false
          });
        }
      }, hisMsg);
    }else { // 取消收藏  delete from 表名 where id = ?
      let statements = `delete from userCollection where userId=? and product_id=? and shopId=?`;
      let parameter = JSON.stringify([
        this.state.userId,
        this.state.productId,
        this.state.shopId
      ]);
      removeShopCollection({ statements, parameter}).then(data => {
        hisMsg();
        if(data.msg === 'ok') {
          message.success('取消收藏成功');
          this.setState({
            collectionTxt: '加入收藏',
            isCollection: true
          })
        }
      }, hisMsg);
    }
  }

  addUserTable(userType, productId, shopId) {
    if(!isLogin()) {
      message.warning('请登录后操作').then(() => {
        sessionStorage.setItem('backUrl', `shopDet?shopId=${productId}`);
        this.props.history.push('login');
      });
      return;
    }
    // 加入用户表操作
    let statements = `insert into ${userType} (code,userId,shopId,product_id,product_name,product_pri,product_genre) values (?,?,?,?,?,?,?)`;
    let parameter = JSON.stringify([
      'kcos1314' + new Date().getTime() + Math.floor(Math.random() * 10000),
      this.state.userId,
      shopId,
      productId,
      this.state.productName,
      parseFloat(this.state.productPri),
      JSON.stringify(this.state.productGenre[this.state.seleIndex])
    ]);
    return {statements, parameter};
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
              <Button type="primary" onClick={ this.addShopCartFn }>加入购物车</Button>
              <Button onClick={ this.addCollectionFn }>{ this.state.collectionTxt }</Button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default withRouter(ShopDetHead);