import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { Button, message, Modal } from 'antd';
import { wantShopData } from '../../../../../api/shopApi.js';
import OrderComponent from './OrderComponent.js';

const { confirm } = Modal;

class WillPaymentOrder extends Component {
    constructor(props: object) {
        super(props);
    }

    state = {
        current: 1,
        pageSize: 3,
        delSuccessful: false
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

    delUserOrder = (code: string) => {
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
                let statements = `UPDATE userOrder SET o_status = '已取消' WHERE code = '${code}'`;
                wantShopData({statements}).then(() => {
                    hasMsg();
                    _this.setState({
                        delSuccessful: !_this.state.delSuccessful
                    })
                }, hasMsg);
            },
            okText: '确定',
            cancelText: '取消'
        });
    };

    render() {
        return (
            <div className="will-payment">
                <OrderComponent
                    delUserOrder={this.delUserOrder}
                    status="待付款"
                    isDelOrder="1"
                    zf_status="1"
                    delSuccessful={this.state.delSuccessful}
                />
            </div>
        )
    }
}

export default withRouter<any>(WillPaymentOrder);