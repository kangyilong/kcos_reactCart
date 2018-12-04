import React from 'react';
import { Spin } from 'antd';

/**
 * @param {Function} loadComponent e.g: () => import('./component')
 * @param {ReactNode} placeholder  未加载前的占位
 */
export default (loadComponent, placeholder = null) => {
  class AsyncComponent extends React.Component {
    unmount = false
    constructor(props) {
      super(props);
      this.state = {
        component: null
      };
    }

    componentWillUnmount() {
      this.unmount = true;
    }

    async componentDidMount() {
      const {default: component} = await loadComponent();

      if (this.unmount) return;

      this.setState({
        component: component
      });
    }

    render() {
      const C = this.state.component;
      return (
        C ? <C {...this.props}></C> : <Spin></Spin>
      );
    }
  }
  return AsyncComponent;
};
