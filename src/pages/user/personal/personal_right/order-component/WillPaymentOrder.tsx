import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { Button, message, Modal } from 'antd';
import NotData from '../../../../../comment/notData/notData';
import { getUserId } from '../../../../../comment/methods/util.js';
import { wantShopData } from '../../../../../api/shopApi.js';
import{ getOrderData } from '../methods/getOrderData';

const { confirm } = Modal;
let shopMsg : Array<Array<any>> = [];
const zfType = {
    '1': '在线支付',
    '2': '货到付款'
};

class WillPaymentOrder extends Component {
    constructor(props: object) {
        super(props);
    }

    state = {
        user_id: getUserId(),
        orderData: [],
        shopMsg: shopMsg
    };

    updateShopNum = async (code: string, hasMsg: any) => {
        let c_statements = `SELECT * FROM orderMsg WHERE p_code = '${code}'`;
        await wantShopData({statements: c_statements}).then(async cData => {
            let len = cData.length;
            for(let i = 0; i < len; i ++) {
                // 先获取该商品库存
                let s_statements = `SELECT shop_Num FROM shopMsg WHERE shop_id = '${cData[i].shop_id}'`;
                await wantShopData({statements: s_statements}).then(async sData => {
                    let shopNum = sData[0].shop_Num + cData[i].shop_val;
                    let u_statements = `UPDATE shopMsg SET shop_Num = ${shopNum} WHERE shop_id = '${cData[i].shop_id}'`;
                    await wantShopData({statements: u_statements});
                }, hasMsg)
            }
        }, hasMsg);
    };

    delUserOrder(code: string) {
        /*
        * 取消订单
        * 取消前先释放商品 update 表名 set 字段1 = ?,字段2 = ?,字段3 = ? where id = ?
        * */
        const _this = this;
        confirm({
            title: '取消订单',
            content: '心意已决，确定取消订单?',
            async onOk() {
                const hasMsg = message.loading('');
                await _this.updateShopNum(code, hasMsg);
                let statements = `DELETE p.*, pp.* FROM userOrder p, orderMsg pp WHERE code = '${code}' AND p_code = '${code}'`;
                wantShopData({statements}).then(() => {
                    getOrderData(_this, hasMsg, '待付款');
                }, hasMsg);
            },
            okText: '确定',
            cancelText: '取消'
        });
    };

    componentWillMount() {
        const hasMsg = message.loading('');
        getOrderData(this, hasMsg, '待付款');
    }

    render() {
        return (
            <div className="will-payment">
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
                                        <NavLink
                                            className="ant-btn ant-btn-primary"
                                            to="/userOrder"
                                            onClick={() => {sessionStorage.setItem('orderCode', willOrderItem['code'])}}
                                        >立即支付</NavLink>
                                        <Button style={{'marginLeft': '15px'}} onClick={this.delUserOrder.bind(this, willOrderItem['code'])}>取消订单</Button>
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
                </ul>
                <div className={this.state.orderData.length === 0 ? '' : 'none'}>
                    <NotData promptTxt="还没有订单哦" />
                </div>
            </div>
        )
    }
}

export default withRouter<any>(WillPaymentOrder);