import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { Menu, Dropdown, Icon } from 'antd';

import './header.css';

export default class Header extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const aboutCompany = (  // 关于公司
      <Menu>
        <Menu.Item>
          <a href="/home">关于1</a>
        </Menu.Item>
        <Menu.Item>
          <a href="/home">关于2</a>
        </Menu.Item>
        <Menu.Item>
          <a href="/home">关于3</a>
        </Menu.Item>
      </Menu>
    );
    const electronic = (  // 电子产品
      <Menu>
        <Menu.Item>
          <a href="/home">电子1</a>
        </Menu.Item>
        <Menu.Item>
          <a href="/home">电子2</a>
        </Menu.Item>
        <Menu.Item>
          <a href="/home">电子3</a>
        </Menu.Item>
      </Menu>
    );
    const newsCenter = (  // 新闻中心
      <Menu>
        <Menu.Item>
          <a href="/home">新闻1</a>
        </Menu.Item>
        <Menu.Item>
          <a href="/home">新闻2</a>
        </Menu.Item>
        <Menu.Item>
          <a href="/home">新闻3</a>
        </Menu.Item>
      </Menu>
    );
    return (
      <div className="header">
        <header>
          <div className="nav-box">
            <div className="nav-left">
              <a href="/"><img src='/static/images/all/logo.png' alt=""/></a>
            </div>
            <div className="nav-right">
              <ul className="nav-ul">
                <li>
                  <NavLink to="home">首页</NavLink>
                </li>
                <li>
                  <Dropdown overlay={ aboutCompany }>
                    <NavLink to="home">关于公司</NavLink>
                  </Dropdown>
                </li>
                <li>
                  <Dropdown overlay={ electronic }>
                    <NavLink to="home">电子产品</NavLink>
                  </Dropdown>
                </li>
                <li>
                  <Dropdown overlay={ newsCenter }>
                    <NavLink to="home">新闻中心</NavLink>
                  </Dropdown>
                </li>
                <li>
                  <NavLink to="home">加入我们</NavLink>
                </li>
                <li>
                  <NavLink to="home">联系我们</NavLink>
                </li>
              </ul>
              <div className="line"></div>
              <div className="u-right">
                <span><Icon type="user" /></span>
              </div>
            </div>
          </div>
        </header>
      </div>
    );
  }
}
