import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, message, Input, Modal } from 'antd';
import { getShopDetData } from '../../../reduxs/action';
import { wantShopData } from "../../../api/shopApi";
import { isLogin } from "../../../comment/methods/util";
import Header from '../../../comment/header';
import Footer from '../../../comment/footer';
import AddRess from './orderChild/OrderAddRess';
import './order.scss';

const { confirm } = Modal;

function mapStateToProps(state) {
  return {
    shopDet: state.shopDet
  };
}

function mapDispatchToProps(dispatch) {
  return {
    singShopMsg(shopItem) {
      dispatch(getShopDetData(shopItem.product_id, shopItem.shop_id))
    }
  }
}

class UserOrder extends Component{
  constructor(props) {
    super(props);
    this.state = {
      orderCode: sessionStorage.getItem('orderCode'),
      shopMsg: [], // 商品详情
      orderShop: [],
      cityOptions: [],
      shopIndex: 0,
      orderMsg: {},
      zx_type: false,
      hd_type: false,
      kd_type: false,
      jj_type: false,
      visible: false,
      u_login: null
    };
  }
  async componentWillMount() {
    let hisMsg = message.loading('加载中...');
    this.setState({
      u_login: !!(await isLogin()).length
    }, () => {
      if(!this.state.u_login) {
        hisMsg();
        message.warning('还未登录哦，请先登录', 1.5).then(() => {
          this.props.history.push('login');
        });
        return;
      }
      Promise.all([
        wantShopData({ statements: `select * from userOrder where code='${ this.state.orderCode }'` }),
        wantShopData({ statements: `select * from orderMsg where p_code='${ this.state.orderCode }'` })
      ]).then(([data1, data2]) => {
        hisMsg();
        if(data1.length > 0) {
          this.setState({
            orderMsg: data1[0],
            orderShop: data2,
            zx_type: data1[0].zf_type === '1' ? true : false,
            hd_type: data1[0].zf_type === '2' ? true : false,
            kd_type: data1[0].ps_type === '1' ? true : false,
            jj_type: data1[0].ps_type === '2' ? true : false
          }, () => {
            this.orderShopMsg(this.state.orderShop, this.props.singShopMsg);
          });
        }
      }, hisMsg);
    });
  }
  shouldComponentUpdate(nextProps) {
    if(nextProps.shopDet !== this.props.shopDet) {
      this.state.shopMsg.push({
        ...nextProps.shopDet[0],
        ...this.state.orderShop[this.state.shopIndex]
      });
      this.state.shopIndex ++;
      this.setState({
        shopMsg: this.state.shopMsg
      });
    }
    return true;
  }
  orderDistributionFn(ev) {
    let target = ev.target;
    switch(target.innerText) {
      case '快递配送(免运费)':
        this.setState({
          kd_type: true,
          jj_type: false
        });
        break;
      case 'EMS加急':
        this.setState({
          kd_type: false,
          jj_type: true
        });
        break;
    }
  }
  orderCollectionFn(ev) {
    let target = ev.target;
    switch(target.innerText) {
      case '在线支付':
        this.setState({
          zx_type: true,
          hd_type: false
        });
        break;
      case '货到付款':
        this.setState({
          zx_type: false,
          hd_type: true
        });
        break;
    }
  }
  cancelOrder = async (shopItem) => {
    /*
    * 取消订单
    * 取消后库中商品总数量加上订单数量
    * delete from tb (where)
    * */
    let { shop_Num, shop_val, shop_id } = shopItem;
    let remainNum = shop_Num + shop_val;
    let statements = `update shopMsg set shop_Num=? where shop_id=?`; // 更新商品数
    let parameter = JSON.stringify([
      remainNum,
      shop_id
    ]);
    await wantShopData({ statements, parameter });
  };

  showConfirm = () => {
    const _this = this;
    confirm({
      title: '取消订单',
      content: '心意已决，确定取消订单?',
      onOk() {
        // 取消订单--将该订单在订单表中的状态改为已取消
        let hasMsg = message.loading('');
        let o_parameter = JSON.stringify([ _this.state.orderCode ]);
        let u_statements = `update userOrder set o_status='已取消' where code = ?`;
        Promise.all([
          wantShopData({statements: u_statements, parameter: o_parameter})
        ]);
        _this.orderShopMsg(_this.state.shopMsg, _this.cancelOrder);
        hasMsg();
        message.success('订单取消成功', 1.5).then(() => {
          _this.props.history.push('/home');
        });
      },
      okText: '确定',
      cancelText: '取消'
    });
  };

  orderShopMsg = (data, optionFn) => {
    data.forEach(item => {
      optionFn(item);
    });
  };

  render() {
    return (
      <div className="user-order">
        <Header />
        <div className="order-box">
          <div className="container">
            <div className="order-header">
              <b>订单号：</b>
              <span className="show-red fz_18">{ this.state.orderCode }</span>
            </div>
            <div className="shop-msg">
              <h5><b>商品信息</b></h5>
              <ul className="shop-ul no-select">
                {
                  this.state.shopMsg.map((item) => (
                    <li key={ item.order_code }>
                      <div className="shop-left" data-id={ item.shop_id }>
                        <div className="shop-img">
                          <img src={ item.shop_pic } alt=""/>
                        </div>
                        <div className="shop-name">
                          <p>{ item.shop_name }</p>
                        </div>
                      </div>
                      <div className="shop-right">
                        <div className="shop-pri">
                          <p>{ item.shop_pri } x <span className="show-red">{ item.shop_val }</span></p>
                        </div>
                        <div className="shop-tol">
                          <p className="show-red">{ (parseFloat(item.shop_pri) * item.shop_val).toFixed(2) }元</p>
                        </div>
                      </div>
                    </li>
                  ))
                }
              </ul>
            </div>
            <div className="zf_type o_flex">
              <div className="left">
                <b>支付方式</b>
              </div>
              <div className="right no-select" onClick={ (ev) => {
                this.orderCollectionFn(ev);
              } }>
                <span className={ this.state.zx_type ? 'sel_sp' : '' }>在线支付</span>
                <span className={ this.state.hd_type ? 'sel_sp' : '' }>货到付款</span>
              </div>
            </div>
            <div className="ps_type o_flex">
              <div className="left">
                <b>配送方式</b>
              </div>
              <div className="right no-select" onClick={ (ev) => {
                this.orderDistributionFn(ev);
              } }>
                <span className={ this.state.kd_type ? 'sel_sp' : '' }>快递配送(免运费)</span>
                <span className={ this.state.jj_type ? 'sel_sp' : '' }>EMS加急</span>
              </div>
            </div>
            <div className="address-box">
              <AddRess o_code={this.state.orderCode}/>
            </div>
            <div className="user-msg">
              <textarea placeholder="说点什么吧~"></textarea>
            </div>
          </div>
          <div className="order-foo o_flex fz_16">
            <div className="foo-left">
              <p>共 <span className="show-red fz_18">{ this.state.orderMsg.shop_sum }</span> 件商品，合计：<span className="show-red fz_17">{ this.state.orderMsg.shop_total }元</span></p>
            </div>
            <div className="foo-right">
              <Button onClick={() => {
                this.showConfirm();
              }}>再想想，取消订单</Button>
              <Button type="primary">确认订单</Button>
            </div>
          </div>
        </div>
        <Footer />
        <div>

        </div>
      </div>
    )
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(UserOrder);