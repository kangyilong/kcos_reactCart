import React, { PureComponent } from 'react';
import {message, Table} from 'antd';
import {wantShopData} from '../../../../../api/shopApi';

interface Props {
    orderCode: string,
    isShow: boolean
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

export default class RunShopDetail extends PureComponent<Props, any> {
    state = {
        runOrderData: []
    };
    getOrderMessage = (orderCode: string) => {
        // 获取子订单信息
        let hasMsg = message.loading('');
        const o_statements = `SELECT p.shop_id, p.shop_pri, p.shop_val, pp.shop_name, pp.shop_pic FROM orderMsg p, shopMsg pp WHERE p.p_code = '${orderCode}' AND p.shop_id = pp.shop_id`;
        wantShopData({statements: o_statements}).then(data => {
            data.map((item: any) => {
                item['key'] = item['shop_id'];
                item['shop_pri'] = item['shop_pri'] + '元';
                return item;
            });
            this.setState({
                runOrderData: data
            });
            hasMsg();
        }, hasMsg);
    };
    componentDidMount() {
        this.getOrderMessage(this.props.orderCode);
    }
    componentWillReceiveProps(nextProps: {isShow: boolean, orderCode: string}) {
        if(nextProps.isShow !== this.props.isShow) {
            this.getOrderMessage(nextProps.orderCode);
        }
    }
    render () {
        return(
            <div>
                <Table columns={columns} dataSource={this.state.runOrderData} />
            </div>
        )
    }
}