import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import './style/index.scss';

class PersonalIndex extends Component {
  render() {
    return (
      <div className="personal-index">个人中心</div>
    )
  }
}

export default withRouter(PersonalIndex);