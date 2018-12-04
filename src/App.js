import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import logo from './static/images/y.jpg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <div className="img-box">
              <img src={logo} className="App-logo" alt="logo" />
          </div>
          <h3>K_COS</h3>
           <p><NavLink to="/home" className="ks">开始你的旅程 -></NavLink></p>
        </header>
      </div>
    );
  }
}

export default App;
