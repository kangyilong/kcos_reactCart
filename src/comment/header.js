import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { Menu, Dropdown, Icon, message } from 'antd';
import { withRouter } from 'react-router-dom';
import { isLogin, outLogin } from './methods/util';

import './header.scss';

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

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      u_login: null
    }
  }
  async componentWillMount() {
    this.setState({
      u_login: !!(await isLogin()).length
    });
  }

  goPersonal = () => {
    if(!this.state.u_login) {
      message.warning('还未登录哦，请登录', 1.5).then(() => {
        this.props.history.push('/login');
      });
    }else {
      this.props.history.push('/personal-index');
    }
  };

  personal = (  // 个人中心
    <Menu>
      <Menu.Item>
      <span onClick={ this.goPersonal }>个人中心</span>
      </Menu.Item>
      <Menu.Item>
          <span
            style={{'color': '#f5222d'}}
            onClick={() => {
              outLogin();
              this.props.history.push('/');
            }}
          >退 出</span>
      </Menu.Item>
    </Menu>
  );

  LongoHeader = () => {
    if(this.state.u_login) {
      return (
        <Dropdown overlay={ this.personal }>
          <div className="u-right">
            <span><Icon type="user" /></span>
          </div>
        </Dropdown>
      )
    }else {
      return (
        <div className="u-right">
          <span onClick={ this.goPersonal }><Icon type="user" /></span>
        </div>
      )
    }
  };

  render() {
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
              {
                this.LongoHeader()
              }
            </div>
          </div>
        </header>
      </div>
    );
  }
}
export default withRouter(Header);
