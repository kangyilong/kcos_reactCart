import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { Button, message, Modal } from 'antd';
import { wantShopData } from '../../../../../api/shopApi.js';
import {getUserId} from '../../../../../comment/methods/util';
import OrderComponent from './OrderComponent.js';

const { confirm } = Modal;

class WillSendOrder extends Component {
    constructor(props: object) {
        super(props);
    }

    state = {
        current: 1,
        pageSize: 3,
        delSuccessful: false,
        m_total: 0,
        user_id: getUserId()
    };

    getUserRunning = () => {
        const u_statements = `SELECT m_total FROM userMsg WHERE user_id='${this.state.user_id}'`;
        wantShopData({statements: u_statements}).then(data => {
            this.setState({
                m_total: data[0].m_total ? parseFloat(data[0].m_total) : 0
            })
        });
    };

    componentWillMount() {
        this.getUserRunning();
    }

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

    delUserOrder = (code: string, total: string) => {
        /*
        * 取消订单
        * 取消前先释放商品 update 表名 set 字段1 = ?,字段2 = ?,字段3 = ? where id = ?
        * */
        const _this = this, r_total = this.state.m_total + parseFloat(total);
        confirm({
            title: '取消订单',
            content: '心意已决，确定取消订单?',
            async onOk() {
                // update 表名 set 字段1 = ?,字段2 = ?,字段3 = ? where id = ?
                // insert into 表名 (字段1,字段2,字段3) values (?,?,?)
                const hasMsg = message.loading('');
                await _this.updateShopNum(code, hasMsg);
                const statements = `DELETE p.*, pp.* FROM userOrder p, orderMsg pp WHERE code = '${code}' AND p_code = '${code}'`;
                const u_statements = `UPDATE userMsg SET m_total=${r_total} WHERE user_id='${_this.state.user_id}'`;
                const run_time = new Date().getTime();
                const r_statements = `INSERT INTO user_running_water (run_code,user_id,money_run,run_type,run_remark,run_time,run_order_code) values (?,?,?,?,?,?,?)`;
                const parameter = JSON.stringify([
                    `kcos_r1314${run_time}${Math.floor(Math.random() * 1000)}`,
                    _this.state.user_id,
                    total,
                    '取消订单',
                    '取消订单',
                    run_time,
                    code
                ]);
                Promise.all([
                    wantShopData({statements: u_statements}),
                    wantShopData({statements: r_statements, parameter}),
                    wantShopData({statements})
                ]).then(() => {
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
                <OrderComponent delUserOrder={this.delUserOrder} status="待发货" isDelOrder="1" zf_status="0" delSuccessful={this.state.delSuccessful}/>
            </div>
        )
    }
}

export default withRouter<any>(WillSendOrder);