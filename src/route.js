import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

// 分片
import AsyncComponent from './component/async-component/async-component';

// 组件集合
let ComponentData = [
  {
    path: '/',
    component: AsyncComponent(() => import('./App'))
  }, {
    path: '/home',
    component: AsyncComponent(() => import('./pages/home/home'))
  }, {
    path: '/shopDet',
    component: AsyncComponent(() => import('./pages/shopDetail/shopDetail'))
  }
];

function comRoute() {
  return ComponentData.map((item) => <Route exact key={item.path} path={item.path} component={item.component}/>)
}

const ROUTER = () => (
    <BrowserRouter>
        <Switch>
          {comRoute()}
        </Switch>
    </BrowserRouter>
);

export default ROUTER;