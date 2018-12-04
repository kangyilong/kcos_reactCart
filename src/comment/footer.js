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
                    <li>公司简介</li>
                    <li>公司简介</li>
                    <li>公司简介</li>
                  </ul>
                </li>
                <li>
                  <h5>关于公司</h5>
                  <ul className='foo-i_ul'>
                    <li>公司简介</li>
                    <li>公司简介</li>
                    <li>公司简介</li>
                    <li>公司简介</li>
                  </ul>
                </li>
                <li>
                  <h5>关于公司</h5>
                  <ul className='foo-i_ul'>
                    <li>公司简介</li>
                    <li>公司简介</li>
                    <li>公司简介</li>
                    <li>公司简介</li>
                  </ul>
                </li>
                <li>
                  <h5>关于公司</h5>
                  <ul className='foo-i_ul'>
                    <li>公司简介</li>
                    <li>公司简介</li>
                    <li>公司简介</li>
                    <li>公司简介</li>
                  </ul>
                </li>
                <li>
                  <h5>关于公司</h5>
                  <ul className='foo-i_ul'>
                    <li>公司简介</li>
                    <li>公司简介</li>
                    <li>公司简介</li>
                    <li>公司简介</li>
                  </ul>
                </li>
              </ul>
            </div>
            <div className="foo-right">
              <h5>1</h5>
              <p>2</p>
              <p>3</p>
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