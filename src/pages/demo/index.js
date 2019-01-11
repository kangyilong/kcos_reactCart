import React, { Component } from 'react';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

import Header from './components/header';
import Footer from './components/footer';
import TodoList from './components/todoList';

import todoApp from './reducer/reducers';
import { createStore, compose, applyMiddleware } from 'redux';

import './index.scss';

let store = createStore(todoApp, compose(
  applyMiddleware(thunk)
));

export default class DemoIndex extends Component {
  render() {
    return (
      <Provider store = { store }>
        <div className="demo-box">
          <Header />
          <TodoList />
          <Footer />
        </div>
      </Provider>
    )
  }
}