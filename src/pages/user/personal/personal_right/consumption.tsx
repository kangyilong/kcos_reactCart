import React, {Component} from 'react';

interface props {
    isShow?: boolean
}

export default class Consumption extends Component <props, any> {

  render() {
    const {isShow} = this.props;
    return(
      <div className={isShow ? 'none' : ''}>consumption</div>
    )
  }
}