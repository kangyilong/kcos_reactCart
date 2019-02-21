/* eslint-disable no-unused-expressions */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Button, message } from 'antd';
import { getQueryString, isLogin } from '../../../comment/methods/util';
import { mapStateToProps, mapDispatchToProps } from '../../shopSuccess/mapDataToProps';
import { wantShopData } from '../../../api/shopApi';
import './shopDetHead.scss';

class ShopDetHead extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: sessionStorage.getItem('isLogin'),
      shopMsgData: [],
      defaultImg: null,
      defaultInv: null,
      productName: null,
      productPri: null,
      productTxt: null,
      seleIndex: 0,
      shopId: null,
      collectionTxt: '',
      addShopVal: 0,
      isCollection: true,
      isOper: true,
      productId: getQueryString('productId'), // 产品ID
      statements: `SELECT * FROM shopMsg where product_id="${ getQueryString('productId') }"`,
    };
    this.addShopCartFn = this.addShopCartFn.bind(this);
    this.addCollectionFn = this.addCollectionFn.bind(this);
  }

  componentWillMount() {
    wantShopData({ statements: this.state.statements }).then(data => {
      this.setState({
        shopMsgData: data,
        defaultImg: data[0].shop_pic,
        defaultInv: data[0].shop_Num,
        productName: data[0].shop_name,
        productPri: data[0].shop_pri,
        productTxt: data[0].shop_txt,
        shopId: data[0].shop_id
      }, () => {
        this.isJudgeShop();
      });
    });
  }

  shouldComponentUpdate(nowProps) { // 加入购物车操作成功后，库存数量减一
    if(!(nowProps === this.props)) {
      // 先查到商品的库存数量 this.state.addShopVal
      let allStatements = `select * from shopMsg where product_id=? and shop_id=?`;
      let allParameter = JSON.stringify([
        this.state.productId,
        this.state.shopId
      ]);
      wantShopData({ statements: allStatements, parameter: allParameter }).then(data => {
        // 查询成功后再进行更新数据操作
        let remainNum = data[0].shop_Num - 1; // 总数量 - 加入购物车数量
        let statements = `update shopMsg set shop_Num=? where product_id=? and shop_id=?`;
        let parameter = JSON.stringify([
          remainNum,
          this.state.productId,
          this.state.shopId
        ]);
        wantShopData({ statements, parameter }).then(data => {
          // 更新库存成功
          if(data.msg === 'ok') {
            this.state.defaultInv --;
            this.setState({
              defaultInv: this.state.defaultInv
            });
          }
        });
      });
    }
    return nowProps;
  }

  isJudgeShop() { // 判断该商品是否被收藏
    if(isLogin()) {
      let hisMsg = message.loading('');
      wantShopData(this.queryParams('userCollection')).then(data => {
        hisMsg();
        if(data && data.length > 0) {
          this.setState({
            collectionTxt: '取消收藏',
            isCollection: false
          });
        }else {
          this.setState({
            collectionTxt: '加入收藏',
            isCollection: true
          })
        }
      }, hisMsg);
    }else {
      this.setState({
        collectionTxt: '加入收藏'
      })
    }
  }

  seleShowImgFn(that, e) { // 选择商品颜色或种类
    let target = e.target;
    if(target.tagName.toLowerCase() === 'img') {
      let seleIndex = +target.getAttribute('data-index');
      let shopId = target.getAttribute('data-id');
      let defaultInv = target.getAttribute('data-value');
      let productTxt = target.getAttribute('data-txt');
      let productPri = target.getAttribute('data-pri');
      let productName = target.getAttribute('title');
      that.setState({
        seleIndex,
        shopId,
        defaultInv,
        productTxt,
        productPri,
        productName,
        defaultImg: that.state.shopMsgData[seleIndex].shop_pic
      }, () => {
        this.isJudgeShop();
      });
    }
  }

  addShopCartFn() { // 加入购物车操作
    if(this.state.isOper) {
      this.setState({
        isOper: false
      });
      let productId = this.state.productId;
      let shopId = this.state.shopId;
      let params = this.addUserTable('userCart', productId, shopId, 1, this.state.productPri);
      if(params) {
        let hisMsg = message.loading('请稍后...');
        wantShopData(this.queryParams('userCart')).then(data => {
          if(data.length > 0) {
            // 用户购物表中已存在该商品，需数量加一
            // update 表名 set 字段1 = ?,字段2 = ?,字段3 = ? where id = ?
            this.setState({
              addShopVal: data[0].shop_val + 1  // 加入到购物车中相同商品的数量
            }, () => {
              let statements = `update userCart set shop_val=? where user_id=? and product_id=? and shop_id=?`;
              let parameter = JSON.stringify([
                this.state.addShopVal,
                this.state.userId,
                this.state.productId,
                this.state.shopId
              ]);
              wantShopData({ statements, parameter }).then(data => {
                hisMsg();
                this.props.getShopSuccessData(this.state.productId, this.state.shopId);
                if(data.msg === 'ok') {
                  this.addCartSuccess(productId, shopId);
                }
              }, hisMsg);
            });
          } else {
            wantShopData(params).then(data => {
              hisMsg();
              this.props.getShopSuccessData(this.state.productId, this.state.shopId);
              if(data.msg === 'ok') {
                this.addCartSuccess(productId, shopId);
              }
            }, hisMsg);
          }
        });
      }
    }
  }

  addCartSuccess(productId, shopId) {
    message.success('加入购物车成功', 1.5).then(() => {
      sessionStorage.setItem('productDet', JSON.stringify({productId, shopId}));
      this.props.history.push('/addShop');
    });
  }

  addCollectionFn() { // 加入收藏操作
    if(this.state.isOper) {
      this.setState({
        isOper: false
      });
      let hisMsg = message.loading('请稍后...');
      if(this.state.isCollection) {
        let params = this.addUserTable('userCollection', this.state.productId, this.state.shopId);
        if(params) {
          wantShopData(params).then(data => {
            hisMsg();
            if(data.msg === 'ok') {
              message.success('加入收藏成功');
              this.setState({
                collectionTxt: '取消收藏',
                isCollection: false,
                isOper: true
              });
            }
          }, hisMsg);
        }
      }else { // 取消收藏  delete from 表名 where id = ?
        let statements = `delete from userCollection where user_id=? and product_id=? and shop_id=?`;
        let parameter = JSON.stringify([
          this.state.userId,
          this.state.productId,
          this.state.shopId
        ]);
        wantShopData({ statements, parameter }).then(data => {
          hisMsg();
          if(data.msg === 'ok') {
            message.success('取消收藏成功');
            this.setState({
              collectionTxt: '加入收藏',
              isCollection: true,
              isOper: true
            })
          }
        }, hisMsg);
      }
    }
  }

  queryParams(queryTable) { // 查询收藏表或购物车表参数
    let statements = `select * from ${queryTable} where user_id=? and product_id=? and shop_id=?`;
    let parameter = JSON.stringify([
      this.state.userId,
      this.state.productId,
      this.state.shopId
    ]);
    return {statements, parameter};
  }

  addUserTable(userType, productId, shopId, shopVal, shopPri) {
    if(!isLogin()) {
      message.warning('请登录后操作', 1.5).then(() => {
        sessionStorage.setItem('backUrl', `shopDet?productId=${productId}`);
        this.props.history.push('login');
      });
      return false;
    }
    // 加入用户购物或收藏表操作
    let statements = '', parameter = '';
    if(shopVal === 0) {
      message.error('不能加入0件商品');
    }
    let code = 'kcos' + new Date().getTime() + Math.floor(Math.random() * 10000);
    if(shopVal) {
      statements = `insert into ${userType} (code,user_id,shop_id,product_id,shop_val,shop_pri) values (?,?,?,?,?,?)`;
      parameter = JSON.stringify([
        code,
        this.state.userId,
        shopId,
        productId,
        shopVal,
        shopPri
      ]);
    }else {
      statements = `insert into ${userType} (code,user_id,shop_id,product_id) values (?,?,?,?)`;
      parameter = JSON.stringify([
        code,
        this.state.userId,
        shopId,
        productId
      ]);
    }
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
                  this.state.shopMsgData.map((item, index) => (
                    <li key={ index } className={ this.state.seleIndex === index ? 'set-li' : ''}>
                      <img
                        src={ item.shop_pic }
                        title={ item.shop_name }
                        data-id={ item.shop_id }
                        data-index={ index }
                        data-value={ item.shop_Num }
                        data-txt={ item.shop_txt }
                        data-pri={ item.shop_pri }
                      />
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ShopDetHead));