import React, { Component } from 'react';

import CompontHead from '../homeComHead/compontHead';
import StificSingle from './stificSingle';

import './stific.scss';

export default class StificDynamic extends Component {
  render() {
    let stificData = [
      {
        stific_pic: '/static/images/all/thumb0.jpg',
        stific_tit: '1MORE“大师对话·中国声”主题发布会',
        stific_txt: '价格更低：网站建设公司自行开发系统，一般的开发成本都会在千元以上，就算网站建设公.....'
      },
      {
        stific_pic: '/static/images/all/thumb1.jpg',
        stific_tit: '无人机的下一个时代 将由“群”定义',
        stific_txt: '当你想到无人机的时候你会觉得它是什么样子的?一个单独的遥控玩具，有螺旋桨，还是一.....'
      },
      {
        stific_pic: '/static/images/all/thumb2.jpg',
        stific_tit: '官方最新MX59-365头戴式耳机发布',
        stific_txt: '5月26日消息，今天，传闻已久的华为荣耀9现身工信部，关于荣耀9什么时候发布以及.....'
      },
      {
        stific_pic: '/static/images/all/thumb3.jpg',
        stific_tit: '如何让你心爱的耳机焕发青春',
        stific_txt: '越来越多的人选择耳机来作为音响发烧的一个手段和娱乐项目。而且这东西用途很广，可以.....'
      }
    ];
    return (
      <div className="home_stific">
        <div className="content">
          <div className="stific-list">
            <CompontHead type="stific" data={ {tit: '科学动态', txt: 'Science'} }/>
            <ul className="stific-ul">
              {
                stificData.map((item, index) =>
                  <StificSingle data={ item } key={ index }/>
                )
              }
            </ul>
          </div>
        </div>
      </div>
    )
  }
}
