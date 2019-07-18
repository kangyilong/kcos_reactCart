import React, { Component } from 'react';
import Swiper from '../../../comment/swiper/swiper';

import './banner.scss';
import {wantShopData} from "../../../api/shopApi";

export default class Banner extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: []
    }
  }
  componentDidMount() {
    let statements = `SELECT id, banner_name, banner_pic, banner_href FROM bannerMsg ORDER BY banner_num`;
    wantShopData({statements}).then(data => {
      let bannerData = data.map(item => ({
          bannerName: item.banner_name,
          pic: item.banner_pic,
          href: item.banner_href
      }));
      this.setState({
          data: bannerData
      });
    });
  }
  render() {
    return (
      <div className="banner">
        <ul className="ban-list">
            {
              this.state.data.length > 0 && (<Swiper data={this.state.data}/>)
            }
        </ul>
      </div>
    );
  }
}