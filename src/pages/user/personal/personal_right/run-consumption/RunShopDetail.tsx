import React, {useState, useEffect, useCallback } from 'react';
import {message, Table} from 'antd';
import {wantShopData} from '../../../../../api/shopApi';

interface Props {
    orderCode: string
}

const columns =  [{
    title: '商品名称',
    dataIndex: 'shop_name'
}, {
    title: '商品图片',
    dataIndex: 'shop_pic',
    render(value: string) {
        return (
            <img src={value} alt="" width="60px"/>
        )
    }
}, {
    title: '交易数量',
    dataIndex: 'shop_val'
}, {
    title: '交易价格',
    dataIndex: 'shop_pri'
}];

export default function RunShopDetail(props: Props) {
    const [runOrderData, setRunOrderData] = useState([]);

    let getOrderMsg = useCallback(async () => {
        // 获取子订单信息
        let hasMsg = message.loading('');
        const o_statements = `SELECT p.shop_id, p.shop_pri, p.shop_val, pp.shop_name, pp.shop_pic FROM orderMsg p, shopMsg pp WHERE p.p_code = '${props.orderCode}' AND p.shop_id = pp.shop_id`;
        await wantShopData({statements: o_statements}).then(data => {
            data.map((item: any) => {
                item['key'] = item['shop_id'];
                item['shop_pri'] = item['shop_pri'] + '元';
                return item;
            });
            setRunOrderData(data);
            hasMsg();
        }, hasMsg);
    }, []);

    useEffect(() => {
        getOrderMsg();
    }, []);

    return(
        <div>
            <Table columns={columns} dataSource={runOrderData} />
        </div>
    )
}