import React, {Component} from 'react';
import { Table, Button, Modal, Input, message } from 'antd';
import {getUserId} from '../../../../comment/methods/util';
import {wantShopData} from '../../../../api/shopApi';
import RunShopDetail from './run-consumption/RunShopDetail';
import './run-consumption/runcomponent.scss';

interface props {
    isShow?: boolean
}

export default class Consumption extends Component <props, any> {

  state = {
      dataSource: [],
      columns: [{
          title: '交易类型',
          dataIndex: 'run_type'
      }, {
          title: '交易总额',
          dataIndex: 'money_run'
      }, {
          title: '交易时间',
          dataIndex: 'run_time'
      }, {
          title: '交易备注',
          dataIndex: 'run_remark'
      }, {
          title: '交易明细',
          dataIndex: 'run_order_code',
          render: (value: string, res: any) => {
              if(res.run_type === '充值') {
                  return (
                      <span>-</span>
                  )
              }else {
                  return (
                      <span
                          style={{'color': '#1890ff', 'cursor': 'pointer'}}
                          onClick={() => {this.showModal(value)}}
                      >查看商品</span>
                  )
              }
          }
      }],
      user_id: getUserId(),
      visible: false,
      orderCode: '',
      showAccount: false,
      accountData: '',
      moneyValueRef: {
          state: {
              value: ''
          }
      },
      moneyTextRef: {
          value: ''
      },
      isShow: false
  };

    getUserRunning = () => {
        // 获取流水数据
        let statements = `SELECT * FROM user_running_water WHERE user_id = '${this.state.user_id}' ORDER BY run_time DESC`;
        wantShopData({statements}).then(data => {
            let dataSource = [];
            if(data && Array.isArray(data)) {
                dataSource = data.map(item => {
                    item.key = item.run_code;
                    item.run_time = new Date(+item.run_time).toLocaleString();
                    item.money_run = item.money_run.toFixed(2) + '元';
                    return item;
                })
            }
            this.setState({
                dataSource
            })
        });
        const u_statements = `SELECT m_total FROM userMsg WHERE user_id='${this.state.user_id}'`;
        wantShopData({statements: u_statements}).then(data => {
            let m_total = (data[0].m_total ? (+data[0].m_total).toFixed(2) : '0.00') + '元';
            this.setState({
                accountData: m_total
            })
        })
    };

    showModal = (value: string) => {
        this.setState({
            orderCode: value,
            isShow: !this.state.isShow
        }, () => {
            this.setState({
                visible: true
            }, () => {
                requestAnimationFrame(() => {
                    let antModal: any = document.querySelector('.ant-modal');
                    antModal.style.width = '800px';
                });
            });
        });
    };

    handleOk = () => {
        this.setState({
            visible: false,
        });
    };

    handleCancel = () => {
        this.setState({
            visible: false,
        });
    };

    showAccountModal = () => {
        this.setState({
            showAccount: true,
        });
    };

    handleAccountOk = () => {
        this.setState({
            showAccount: false
        }, () => {
            /*
            * 资金总额增加 update 表名 set 字段1 = ?,字段2 = ?,字段3 = ? where id = ?
            * 产生充值流水 insert into 表名 (字段1,字段2,字段3) values (?,?,?)
            * */
            const hasMsg = message.loading('');
            const m_value = this.state.moneyValueRef.state.value;
            const m_text = this.state.moneyTextRef.value;
            const u_statements = `UPDATE userMsg SET m_total = ${parseFloat(m_value) + parseFloat(this.state.accountData)} WHERE user_id = '${this.state.user_id}'`;
            const run_time = new Date().getTime();
            const r_statements = `INSERT INTO user_running_water (run_code,user_id,money_run,run_type,run_remark,run_time) values (?,?,?,?,?,?)`;
            const parameter = JSON.stringify([
                `kcos_r1314${run_time}${Math.floor(Math.random() * 1000)}`,
                this.state.user_id,
                m_value,
                '充值',
                m_text,
                run_time
            ]);
            Promise.all([
                wantShopData({statements: u_statements}),
                wantShopData({statements: r_statements, parameter})
            ]).then(() => {
                this.getUserRunning();
                hasMsg();
            }, hasMsg);
        });
    };

    handleAccountCancel = () => {
        this.setState({
            showAccount: false,
        });
    };

    componentWillMount() {
        this.getUserRunning();
    }

  render() {
    const {isShow} = this.props;
    return(
      <div className={`${isShow ? 'none' : ''} consumption-warp`}>
        <div className="consumption-header">
          <Button type="primary" onClick={this.showAccountModal}>账户充值</Button>
        </div>
          <Table columns={this.state.columns} dataSource={this.state.dataSource} />
          <Modal
              title="商品详情"
              visible={this.state.visible}
              onOk={this.handleOk}
              onCancel={this.handleCancel}
              okText="确定"
              cancelText="取消"
          >
              <RunShopDetail orderCode={this.state.orderCode} isShow={this.state.isShow}/>
          </Modal>
          <Modal
              title="账户充值"
              visible={this.state.showAccount}
              onOk={this.handleAccountOk}
              onCancel={this.handleAccountCancel}
              okText="确定"
              cancelText="取消"
          >
              <div className="to-up">
                  <div className="tu-head">
                      <p>账户余额：<span>{this.state.accountData}</span></p>
                  </div>
                  <div className="tu-content">
                      <p>
                          <label htmlFor="money">充值金额：</label>
                          <Input name="money" ref={(val: any) => {this.state.moneyValueRef = val}} placeholder="请输入充值金额"/>
                      </p>
                      <p>
                          <label htmlFor="cz_text">充值备注：</label>
                          <textarea name="cz_text" ref={(txt: any) => {this.state.moneyTextRef = txt}} placeholder="请输入充值备注"></textarea>
                      </p>
                  </div>
              </div>
          </Modal>
      </div>
    )
  }
}