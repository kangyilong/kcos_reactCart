import React, { Component } from 'react';

export default class OtTypeSingle extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <li className="ot-single">
        <div className="ot-img">
          <img src={ this.props.data.ot_img } />
        </div>
        <div className="ot-foo">
          <div className="ot-foo_s">
            <h4 className="foo-s_sp01">{ this.props.data.tit }</h4>
            <h5 className="foo-s_sp02">{ this.props.data.txt }</h5>
          </div>
          <p className="ot-foo_h">
            <span>进一步了解 <b>&gt;</b></span>
          </p>
        </div>
      </li>
    )
  }
}
