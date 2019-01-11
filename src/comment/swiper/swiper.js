import React, { Component } from 'react';
import './swiper.scss';
import store from '../../reduxs/store';
import { addTodo, toggleTodo, setVisibilityFilter, VisibilityFilters } from '../../reduxs/action';

export default class Swiper extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      banTime: null,
      setBanner: 0,
      setSpan: -1
    }
  }

  componentWillMount() {
    let i = this.props.data.length;
    setTimeout(() => {
      this.setState({
        setSpan: 0
      });
    }, 0);
    clearInterval(this.state.banTime);
    this.state.banTime = setInterval(() => {
      this.changeSetBanner(i);
    }, 4000);
  }
  changeSetBanner(i) {
    if(this.state.setBanner === i - 1) {
      this.setState({
        setBanner: 0,
        setSpan: 0
      });
    }else {
      this.state.setBanner++;
      this.state.setSpan ++;
      this.setState({
        setBanner: this.state.setBanner,
        setSpan: this.state.setSpan
      });
    }
  }
  componentWillUnmount() {
    clearInterval(this.state.banTime);
  }

  render() {
    return (
      <div className="swiper">
        <ul className="sw-list">
          { this.props.data.map((item, index) =>
            <li key={index} className={this.state.setBanner === index ? 'set-banner' : ''}>
              <a href={item.href} target='_blank' style={{backgroundImage: `url(${item.pic})`}}></a>
            </li>
          ) }
          <div className="sw-bz">
            { this.props.data.map( (item, index) =>
              <p key={index}><span className={this.state.setSpan === index ? 'set-span' : ''}></span></p>
            )}
          </div>
        </ul>
      </div>
    );
  }
}