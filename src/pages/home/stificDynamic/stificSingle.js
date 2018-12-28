import React, { Component } from 'react';

export default class StificSingle extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <li className="stific-li">
        <div className="fic-head">
          <img src={ this.props.data.stific_pic }/>
        </div>
        <div className="fic-con">
          <h5>{ this.props.data.stific_tit }</h5>
          <p>{ this.props.data.stific_txt }</p>
        </div>
        <div className="fic-foo">
          <span>阅读更多</span>
          <span className="foo-sp">&gt;</span>
        </div>
      </li>
    )
  }
}
