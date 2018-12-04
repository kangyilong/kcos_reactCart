import React, { Component } from 'react';
import './swiper.scss';

export default class Swiper extends Component {
  constructor(props) {
    super(props);
    this.state = {
      banTime: null,
      setBanner: 0
    }
  }

  componentWillMount() {
    let i = this.props.data.length;
    this.state.banTime = setInterval(() => {
      if(this.state.setBanner === i - 1) {
        this.setState({
          setBanner: 0
        });
      }else {
        this.state.setBanner++
        this.setState({
          setBanner: this.state.setBanner
        });
      }
    }, 3100);
  }

  componentWillUnmount() {}

  render() {
    return (
      <div className="swiper">
        <ul className="sw-list">
          <nobr>
            { this.props.data.map((item, index) =>
              <li key={index} className={this.state.setBanner === index ? 'set-banner' : ''}>
                <a href={item.href} style={{backgroundImage: `url(${item.pic})`}}></a>
              </li>
            ) }
          </nobr>
        </ul>
      </div>
    );
  }
}