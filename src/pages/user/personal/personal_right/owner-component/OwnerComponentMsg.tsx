import React, { useState, useEffect, useCallback } from 'react';
import {getUserId} from '../../../../../comment/methods/util';
import {wantShopData} from '../../../../../api/shopApi';
import { withRouter } from 'react-router-dom';
import { NavLink } from 'react-router-dom';

interface Props {
    history: {
        push: Function
    },
    targetLeft: Function
}

function OwnerComponentMsg(props: Props) {
    const [willOrderNum, setWillOrderNum] = useState(0);
    const [sendOrderNum, setSendOrderNum] = useState(0);
    const [goodOrderNum, setGoodOrderNum] = useState(0);
    const [userTotalNum, setUserTotalNum] = useState('');
    const user_id = getUserId();
    let getUserData = async () => {
        const w_statements = `SELECT count(*) AS total FROM userOrder WHERE o_status = '待付款' AND user_id='${user_id}'`;
        const d_statements = `SELECT count(*) AS total FROM userOrder WHERE o_status = '待发货' AND user_id='${user_id}'`;
        const s_statements = `SELECT count(*) AS total FROM userOrder WHERE o_status = '待收货' AND user_id='${user_id}'`;
        const u_statements = `SELECT m_total FROM userMsg WHERE user_id = '${user_id}'`;
        Promise.all([
            wantShopData({statements: w_statements}),
            wantShopData({statements: d_statements}),
            wantShopData({statements: s_statements}),
            wantShopData({statements: u_statements})
        ]).then(([data1, data2, data3, data4]) => {
            setWillOrderNum(data1[0].total);
            setSendOrderNum(data2[0].total);
            setGoodOrderNum(data3[0].total);
            let m_total = parseFloat(data4[0].m_total ? data4[0].m_total : 0).toFixed(2) + '元';
            setUserTotalNum(m_total);
        });
    };
    useEffect(() => {
        getUserData();
    }, []);

    return (
        <div className="owner-nav">
            <ul className="nav-ul elm_flex" onClick={() => {props.targetLeft()}}>
                <li onClick={() => {props.history.push("/personal-index?index=2")}} style={{'cursor': 'pointer'}}>
                    <div className="dzf-num fz_17">{willOrderNum}</div>
                    <p className="fz_17">待付款</p>
                </li>
                <li onClick={() => {props.history.push("/personal-index?index=2&type=2")}} style={{'cursor': 'pointer'}}>
                    <div className="dzf-num fz_17">{sendOrderNum}</div>
                    <p className="fz_17">待发货</p>
                </li>
                <li onClick={() => {props.history.push("/personal-index?index=2&type=3")}} style={{'cursor': 'pointer'}}>
                    <div className="dsh-num fz_17">{goodOrderNum}</div>
                    <p className="fz_17">待收货</p>
                </li>
                <li>
                    <div className="zh-num fz_17">{userTotalNum}</div>
                    <p className="fz_17">账户余额</p>
                </li>
            </ul>
        </div>
    )
}

export default withRouter<any>(OwnerComponentMsg);