import React, {Component} from 'react';
import { Tabs, Button } from 'antd';
import { withRouter } from "react-router-dom";
import WillPaymentOrder from './order-component/WillPaymentOrder';
import WillSendOrder from './order-component/WillSendOrder';
import WillTheGoodsOrder from './order-component/WillTheGoodsOrder';
import WillEvaluationOrder from './order-component/WillEvaluationOrder';
import DidCompleteOrder from './order-component/DidCompleteOrder';
import RemComponentOrder from './order-component/RemComponentOrder';
import {getQueryString} from '../../../../comment/methods/util';

const TabPane = Tabs.TabPane;

interface props {
    isShow?: boolean,
    history: {
        push: Function
    }
}

class Order extends Component <props, any> {

    state = {
        defaultActiveKey: getQueryString('type') || '1'
    };

  callback = (values: any) => {
    this.props.history.push(`/personal-index?index=2&type=${values}`);
  };

  render() {
    const { isShow } = this.props;
    return (
      <div className={`${isShow ? 'none' : ''} user-order`}>
          <div className="per-order-box">
              <Tabs defaultActiveKey={this.state.defaultActiveKey} onChange={this.callback}>
                  <TabPane tab="待付款" key="1">
                      <WillPaymentOrder />
                  </TabPane>
                  <TabPane tab="待发货" key="2">
                      <WillSendOrder />
                  </TabPane>
                  <TabPane tab="待收货" key="3">
                      <WillTheGoodsOrder />
                  </TabPane>
                  <TabPane tab="待评价" key="4">
                      <WillEvaluationOrder />
                  </TabPane>
                  <TabPane tab="已完成" key="5">
                      <DidCompleteOrder />
                  </TabPane>
                  <TabPane tab="已取消" key="6">
                      <RemComponentOrder />
                  </TabPane>
              </Tabs>
          </div>
      </div>
    )
  }
}
export default withRouter<any>(Order);