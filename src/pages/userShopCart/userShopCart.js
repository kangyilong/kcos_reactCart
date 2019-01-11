import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import Header from '../../comment/header';
import Footer from '../../comment/footer';
import RemShop from '../remUserShop/remShop';
import OptionShopNum from './singCartShop/optionShopNum';
import UserShopTotal from './userShopTotal';
import { Table } from 'antd';
import { Button } from 'antd';
import { getShopData } from '../../api/shopApi';

import './userShopCart.scss';

let seleShopData = [];
let seleShop = {
  key: '',
  shopNumber: null
};
let isChange = false;
let shopSum = 0;  // 小计
function getChildData(newShopNum, price) {
  seleShop.shopNumber = newShopNum;
  if(isChange) {
    seleShopData.forEach((item) => {
      if(item.key === seleShop.key) {
        item.shopNumber = newShopNum;
      }
    })
  } else {
    seleShopData.push(JSON.parse(JSON.stringify(seleShop)));
  }
}

const columns = [{
    title: '商品',
    dataIndex: 'shopName'
  }, {
    title: '单价',
    dataIndex: 'shopPrice'
  }, {
    title: '数量',
    dataIndex: 'shopNumber',
    render: (num, data) => (
      <OptionShopNum data={ data } onChange={ getChildData }/>
    )
  }, {
    title: '操作',
    dataIndex: 'operation',
    render: () => (
      <Button type="danger">删除</Button>
    )
}];

class UserShopCart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      productData: [],
      selectedRowKeys: [],
      data: [{
        key: '1',
        shopName: 'John Brown',
        shopPrice: 32,
        shopNumber: 1,
        shopSum: null
      }, {
        key: '2',
        shopName: 'Jim Green',
        shopPrice: 42,
        shopNumber: 2,
        shopSum: null
      }, {
        key: '3',
        shopName: 'Joe Black',
        shopPrice: 32,
        shopNumber: 3,
        shopSum: null
      }, {
        key: '4',
        shopName: 'Disabled User',
        shopPrice: 99,
        shopNumber: 4,
        shopSum: null
      }]
    };
    this.changeShopNum = this.changeShopNum.bind(this);
  }
  componentWillMount() {
    getShopData({statements: 'SELECT * FROM shopMsg'}).then(data => {
      data.map(item => {
        item.product_genre = JSON.parse(item.product_genre)[0];
        item.product_pri = item.product_pri.toFixed(2) + '元';
      });
      data.length = 8;
      this.setState({
        productData: data
      })
    });
  }
  selectRow = (record, event) => {
    console.log(record);
    let target = event.target;
    const selectedRowKeys = [...this.state.selectedRowKeys];
    if(target.tagName.toLowerCase() === 'button') { // 删除操作
      this.state.data.forEach((item, index) => {
        if(item.key === record.key) {
          this.state.data.splice(index, 1);
        }
      });
      this.setState({ selectedRowKeys });
      return;
    }

    if(target.tagName.toLowerCase() === 'span') {  // 商品加减操作
      event.stopPropagation();
      if(seleShopData.length) {
        let i = 0,
          len = seleShopData.length;
        for(; i < len; i ++) {
          if(seleShopData[i].key === record.key) {
            isChange = true;
            break;
          }
        }
      }
      seleShop.key = record.key;
      if(!isChange) {
        isChange = false;
      }
      this.changeShopNum(selectedRowKeys, record);
    }else {
      if (selectedRowKeys.indexOf(record.key) >= 0) {
        selectedRowKeys.splice(selectedRowKeys.indexOf(record.key), 1);
      } else {
        selectedRowKeys.push(record.key);
      }
      this.changeShopNum(selectedRowKeys, record);
    }
  };

  changeShopNum(selectedRowKeys, record) {
    let shopNumber = 0;
    this.setState({ selectedRowKeys }, () => {
      if(seleShopData.length) {
        let i = 0,
          len = seleShopData.length;
        for(; i < len; i ++) {
          if(seleShopData[i].key === record.key) {
            shopNumber = seleShopData[i].shopNumber;
            break;
          } else {
            shopNumber = record.shopNumber;
          }
        }
      }else {
        shopNumber = record.shopNumber;
      }
      this.state.data.forEach(item => {
        if(item.key === record.key) {
          item.shopSum = shopNumber * item.shopPrice;
        }
      });
      this.setState({
        data: this.state.data
      });
      console.log(this.state.data);
    });
  }

  onSelectedRowKeysChange = (selectedRowKeys) => {
    this.setState({ selectedRowKeys });
  };

  render() {
    const { selectedRowKeys } = this.state;
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectedRowKeysChange,
    };
    return (
      <div className="user-shop_cart">
        <Header />
        <div className="content">
          <div className="user-cart">
            <Table
              rowSelection={rowSelection}
              columns={columns}
              dataSource={this.state.data}
              onRow={(record) => ({
                onClick: (event) => {
                  this.selectRow(record, event);
                },
              })}
            />
          </div>
          <UserShopTotal />
          <RemShop productData={ this.state.productData }/>
        </div>
        <Footer />
      </div>
    )
  }
}
export default withRouter(UserShopCart);