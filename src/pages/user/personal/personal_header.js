import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { Menu, Dropdown, Icon, message } from 'antd';
import { withRouter } from 'react-router-dom';
import { isLogin, outLogin } from '../../../comment/methods/util';

import './style/personal_header.scss';

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

class PersonalHeader extends Component {
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
  render() {
    const personal = (  // 个人中心
      <Menu>
        <Menu.Item>
      <span onClick={
        () => {
          if(!this.state.u_login) {
            message.warning('还未登录哦，请登录', 1.5).then(() => {
              this.props.history.push('/login');
            });
          }else {
            this.props.history.push('/personal-index');
          }
        }
      }>个人中心</span>
        </Menu.Item>
        <Menu.Item>
          <span
            style={{'color': '#f5222d'}}
            onClick={
              () => { outLogin(); this.props.history.push('/'); }
            }
          >退 出</span>
        </Menu.Item>
      </Menu>
    );
    return (
      <div className="personal-header wb">
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
              <div className="u-right elm_flex">
                <Dropdown overlay={ personal }>
                  <p>
                    <Icon type="user" />
                    <span className="name">ksy</span>
                  </p>
                </Dropdown>
                <p>
                  <Icon type="shopping-cart" />
                  <span className="cart" onClick={() => {
                    this.props.history.push('/shopCart');
                  }}>购物车</span>
                </p>
              </div>

            </div>
          </div>
        </header>
      </div>
    );
  }
}
export default withRouter(PersonalHeader);
