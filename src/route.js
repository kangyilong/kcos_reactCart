import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
// 分片
import AsyncComponent from './component/async-component/async-component';
// 跳转到顶部
import ScrollToTop from './component/scrollToTop/scrollToTop';
import { Provider } from 'react-redux';
import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import todoApp from './reduxs/reducers';

const store = createStore(todoApp, compose(
  applyMiddleware(thunk)
));

// 组件集合
let ComponentData = [
  {
    path: '/',
    component: AsyncComponent(() => import('./App'))
  }, {
    path: '/home',
    component: AsyncComponent(() => import('./pages/home/home'))
  }, {
    path: '/register',
    component: AsyncComponent(() => import('./pages/user/register'))
  }, {
    path: '/login',
    component: AsyncComponent(() => import('./pages/user/login'))
  }, {
    path: '/shopDet',
    component: AsyncComponent(() => import('./pages/shopDetail/shopDetail'))
  }, {
    path: '/addShop',
    component: AsyncComponent(() => import('./pages/shopSuccess/shopSuccess'))
  }, {
    path: '/shopCart',
    component: AsyncComponent(() => import('./pages/userShopCart/userShopCart'))
  }, {
    path: '/userOrder',
    component: AsyncComponent(() => import('./pages/user/order/order'))
  }, {
    path: '/personal-index',
    component: AsyncComponent(() => import('./pages/user/personal/index'))
  }, {
    path: '/scoket',
    component: AsyncComponent(() => import('./pages/socket-demo/scoket.tsx'))
  }
];


function comRoute() {
  return ComponentData.map((item) => <Route exact key={item.path} path={item.path} component={item.component}/>)
}

const ROUTER = () => (
  <Provider store={ store }>
    <BrowserRouter>
      <ScrollToTop>
        <Switch>
          { comRoute() }
        </Switch>
      </ScrollToTop>
    </BrowserRouter>
  </Provider>
);

export default ROUTER;