import React, {Component} from 'react';

export interface Props {
    isShow?: boolean
}

export default class Collection extends Component <Props, any> {

  render() {
    const { isShow } = this.props;
    return (
      <div className={isShow ? 'none' : ''}>collection</div>
    )
  }
}