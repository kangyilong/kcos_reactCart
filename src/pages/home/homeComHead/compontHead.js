import React, { Component } from 'react';

import './comhead.scss';

export default class CompontHead extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let headRight = null;
    if(this.props.type === 'shopList') {
      headRight = <div className="head-right">
                    <span onClick={ this.toLeft }>&lt;</span>
                    <span onClick={ this.toRight }>&gt;</span>
                  </div>;
    }else {
      headRight = <div className="head-right">
                    <span className="more">查看更多 &gt;</span>
                  </div>;
    }
    return (
      <div className="list-head">
        <div className="head-left">
          <h5>{ this.props.data.tit }</h5>
          <p>{ this.props.data.txt }</p>
        </div>
        { headRight }
      </div>
    )
  }
}
