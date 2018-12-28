import React, { Component } from 'react';

import './footer.scss';

export default class Footer extends Component {
  render() {
    return (
      <footer>
        <div className="footer">
          <div className="foo-box">
            <div className="foo-left">
              <ul className="foo-u_ul">
                <li>
                  <h5>关于公司</h5>
                  <ul className='foo-i_ul'>
                    <li>公司简介</li>
                    <li>线上反馈</li>
                    <li>加入我们</li>
                    <li>联系我们</li>
                  </ul>
                </li>
                <li>
                  <h5>最新活动</h5>
                  <ul className='foo-i_ul'>
                    <li>配件周边</li>
                    <li>热门产品</li>
                    <li>线下聚会</li>
                    <li>旅游活动</li>
                  </ul>
                </li>
                <li>
                  <h5>电子产品</h5>
                  <ul className='foo-i_ul'>
                    <li>热门手机</li>
                    <li>耳机音响</li>
                    <li>手机配件</li>
                    <li>周边产品</li>
                  </ul>
                </li>
                <li>
                  <h5>新闻中心</h5>
                  <ul className='foo-i_ul'>
                    <li>新闻动态</li>
                    <li>官网新闻</li>
                    <li>最新资讯</li>
                    <li>图片展示</li>
                  </ul>
                </li>
                <li>
                  <h5>关注我们</h5>
                  <ul className='foo-i_ul'>
                    <li>客服QQ</li>
                    <li>新浪新闻</li>
                    <li>官方微信</li>
                    <li>官方邮件</li>
                  </ul>
                </li>
              </ul>
            </div>
            <div className="foo-right">
              <h4>400-000-0000</h4>
              <p className="p02">周一至周日 9:00-18:00（仅收市话费)</p>
              <p className="p03"><i></i>在线留言</p>
            </div>
          </div>
          <div className="foo">
            <p>Copyright © 2017, MetInfo Digital Co., Ltd. All Rights Reserved.</p>
            <p className='ook'>官方在线商城</p>
            <p>Powered by <a href="/home">MetInfo</a>  5.3.19</p>
          </div>
        </div>
      </footer>
    );
  }
}
