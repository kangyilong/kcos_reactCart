import React from 'react';

import './notData.scss';

const NotData = ({ promptTxt }) => (
  <div className="not-data">
    <p>{ promptTxt }</p>
  </div>
);

export default NotData;