import React, { Component } from 'react';
import { withRouter } from "react-router-dom";

class ScrollToTop extends Component {
  constructor(props) {
    super(props);
  }
  componentDidUpdate(prevProps) {
    window.scrollTo(0, 0);
    // if (this.props.location.pathname !== prevProps.location.pathname) {
    // }
  }
  render() {
    return this.props.children;
  }
}
export default withRouter(ScrollToTop)