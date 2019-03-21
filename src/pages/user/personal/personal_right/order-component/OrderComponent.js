import React, { Component } from 'react';
import { NavLink } from "react-router-dom";
import { Button, message, Modal, Pagination } from 'antd';
import NotData from '../../../../../comment/notData/notData';
import{ getOrderData } from '../methods/getOrderData';

const zfType = {
    '1': '在线支付',
    '2': '货到付款'
};

export default class OrderComponent extends Component {
    
    constructor(props) {
        super(props);
    }

    state = {
        orderData: [],
        shopMsg: [],
        current: 1,
        pageSize: 3,
        total: 0
    };
    
    isDelButton = (code, total) => {
        if(this.props.isDelOrder === '0') {
            return null;
        }else {
            return (
              <Button
                style={{'marginLeft': '15px'}}
                onClick={() => {this.props.delUserOrder(code, total)}}
              >取消订单</Button>
            )
        }
    };
    
    isTozfButton = (code) => {
        if(this.props.zf_status === '0') {
            return null;
        }else {
            return (
              <NavLink
                className="ant-btn ant-btn-primary"
                to="/userOrder"
                onClick={() => {sessionStorage.setItem('orderCode', code)}}
              >立即支付</NavLink>
            )
        }
    };

    onChangePagination = (pageNumber) => {
        const hasMsg = message.loading('');
        this.setState({
            current: pageNumber
        });
        getOrderData(this, hasMsg, this.props.status, pageNumber, this.state.pageSize);
    };

    componentWillMount() {
        const hasMsg = message.loading('');
        getOrderData(this, hasMsg, this.props.status, this.state.current, this.state.pageSize);
    }
  
    shouldComponentUpdate(nextProps) {
        if(nextProps.delSuccessful && nextProps.delSuccessful !== this.props.delSuccessful) {
          const hasMsg = message.loading('');
          getOrderData(this, hasMsg, this.props.status, this.state.current, this.state.pageSize);
        }
        return true;
    }

    render() {
        return (
            <>
                <ul className="will-all_ul">
                    {
                        this.state.orderData.length > 0 ? this.state.orderData.map((willOrderItem, index) => (
                            <li className="will-all_li" key={index}>
                                <div className="will-header">
                                    <div className="head-left">
                                        <p className="l-p01">订单号：<span>{willOrderItem['code']}</span>
                                            <span>{willOrderItem['o_time'] ? new Date(+willOrderItem['o_time']).toLocaleString() : ''}</span>
                                            <span>{zfType[willOrderItem['zf_type']]}</span>
                                        </p>
                                        <p className="l-p02">订单金额：<span>{willOrderItem['shop_total']}元</span></p>
                                    </div>
                                    <div className="head-right">
                                      {
                                        this.isTozfButton(willOrderItem['code'])
                                      }
                                      {
                                          this.isDelButton(willOrderItem['code'], willOrderItem['shop_total'])
                                      }
                                    </div>
                                </div>
                                {
                                    this.state.shopMsg[index] ? this.state.shopMsg[index].map(msgItem => (
                                        <div className="will-container" key={msgItem.order_code}>
                                            <div className="will-li_left">
                                                <div className="left-img">
                                                    <img src={msgItem.shop_pic} alt=""/>
                                                </div>
                                                <div className="left-txt">
                                                    <p className="txt-p01">{msgItem['shop_name']}</p>
                                                    <p className="txt-p02">{msgItem['shop_pri']}元 X <span>{msgItem['shop_val']}</span></p>
                                                </div>
                                            </div>
                                            <div className="will-li_right">
                                                <NavLink className="ant-btn" to={`/shopDet?productId=${msgItem.product_id}`}>商品详情</NavLink>
                                            </div>
                                        </div>
                                    )) : null
                                }
                            </li>
                        )) : null
                    }
                    <Pagination
                        showQuickJumper
                        hideOnSinglePage={true}
                        current={this.state.current}
                        pageSize={this.state.pageSize}
                        total={this.state.total}
                        onChange={this.onChangePagination}
                    />
                </ul>
                <div className={this.state.orderData.length === 0 ? '' : 'none'}>
                    <NotData promptTxt="还没有订单哦" />
                </div>
            </>
        )
    }
}