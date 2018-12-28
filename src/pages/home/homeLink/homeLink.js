import React, { Component } from 'react';

import './homelink.scss';

function HomeLinkFn(props) {
  return (
    props.data.map((item, index) => (
      <li className='link-li' key={index}>
        <div className="li-head">
          <div className='back-box' style={{'backgroundImage': `url(${item.pic})`}}></div>
        </div>
        <h5>{item.tit}</h5>
        <p>{item.txt}</p>
      </li>
      )
    )
  );
}

export default class HomeLink extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [
        {
          pic: '/static/images/all/1495693824.png',
          tit: '配件周边',
          txt: '开售提醒 参与抽奖'
        }, {
          pic: '/static/images/all/1495697648.png',
          tit: '热门产品',
          txt: '周一上午10:00 限时开抢'
        }, {
          pic: '/static/images/all/1495693914.png',
          tit: '线下聚会',
          txt: '来自五湖四海 志趣相投'
        }, {
          pic: '/static/images/all/1495693941.png',
          tit: '旅游活动',
          txt: '带上PRO 放下单反'
        }
      ]
    }
  }
  render() {
    return (
      <div className='content'>
        <ul className='link-ul'>
          <HomeLinkFn data={this.state.data}/>
        </ul>
      </div>
    );
  }
}