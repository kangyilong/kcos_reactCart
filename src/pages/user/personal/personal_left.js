import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

import './style/personal_left.scss';

export default class PersonalLeft extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { selectedIndex = '1' } = this.props;
    return (
      <div className="personal-left wb">
        <h5 className="p-title fz_18">个人中心</h5>
        <ul className="left-ul fz_16" onClick={() => {
          this.props.targetLeft();
        }}>
          <li><NavLink to="/personal-index?index=1" className={selectedIndex === '1' ? 'selected' : ''}>个人中心</NavLink></li>
          <li><NavLink to="/personal-index?index=2" className={selectedIndex === '2' ? 'selected' : ''}>我的订单</NavLink></li>
          <li><NavLink to="/personal-index?index=3" className={selectedIndex === '3' ? 'selected' : ''}>我的收藏</NavLink></li>
          <li><NavLink to="/personal-index?index=4" className={selectedIndex === '4' ? 'selected' : ''}>收货地址</NavLink></li>
          <li><NavLink to="/personal-index?index=5" className={selectedIndex === '5' ? 'selected' : ''}>消费明细</NavLink></li>
        </ul>
      </div>
    )
  }
}