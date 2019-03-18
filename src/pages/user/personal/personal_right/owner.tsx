import React, {Component} from 'react';

interface props {
  isShow?: boolean
}

export default class Owner extends Component <props, any> {

  render() {
    const {isShow} = this.props;
    return (
      <div className={isShow ? 'none' : ''}>owner</div>
    )
  }
}