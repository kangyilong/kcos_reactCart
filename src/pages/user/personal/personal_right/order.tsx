import React, {Component} from 'react';
import { Tabs, Button } from 'antd';
import WillPaymentOrder from './order-component/WillPaymentOrder';

const TabPane = Tabs.TabPane;

interface props {
    isShow?: boolean
}

export default class Order extends Component <props, any> {

  callback = (values: any) => {
    console.log(values);
  };

  render() {
    const { isShow } = this.props;
    return (
      <div className={`${isShow ? 'none' : ''} user-order`}>
          <div className="per-order-box">
              <Tabs defaultActiveKey="1" onChange={this.callback}>
                  <TabPane tab="待付款" key="1">
                      <WillPaymentOrder />
                  </TabPane>
                  <TabPane tab="待发货" key="2">Content of Tab Pane 2</TabPane>
                  <TabPane tab="待收货" key="3">Content of Tab Pane 3</TabPane>
                  <TabPane tab="待评价" key="4">Content of Tab Pane 3</TabPane>
                  <TabPane tab="已完成" key="5">Content of Tab Pane 3</TabPane>
              </Tabs>
          </div>
      </div>
    )
  }
}