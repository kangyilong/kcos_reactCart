import React, { Component } from 'react';

import Header from '../../comment/header';
import Footer from '../../comment/footer';
import Banner from './banner/banner';
import HomeLink from './homeLink/homeLink';
import HomeOtType from './homeOtType/homeOtType';
import HomeShopList from './shopList/shopList';
import StificDynamic from './stificDynamic/stificDynamic';

import './home.scss';

export default class Home extends Component {
  componentWillMount() {

  }
  render() {
    return (
      <div className="home-wrapper">
        <Header />
        <div className="home-content">
          <Banner />
          <HomeLink />
          <HomeShopList />
          <HomeOtType />
          <StificDynamic />
        </div>
        <Footer />
      </div>
    );
  }
}
