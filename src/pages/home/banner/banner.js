import React, { Component } from 'react';
import Swiper from '../../../comment/swiper/swiper';

import './banner.scss';

export default class Banner extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [
        {
          href: 'http://www.baidu.com',
          pic: '/static/images/y4.jpg'
        },
        {
          href: 'http://www.baidu.com',
          pic: '/static/images/y5.png'
        }
      ]
    }
  }
  render() {
    return (
      <div className="banner">
        <ul className="ban-list">
          <Swiper data={this.state.data}/>
        </ul>
      </div>
    );
  }
}