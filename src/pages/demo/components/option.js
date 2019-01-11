/* eslint-disable react/react-in-jsx-scope */
import FilterLink from '../container/filterLink';
import { OPTIONS_TODO } from '../actionFig/actionFig';
import React from 'react';
const Option = () => (
  <div className="footer">
    <div className="sp-list">
      <FilterLink filter={ OPTIONS_TODO.SHOW_ALL }>All</FilterLink>
      <FilterLink filter={ OPTIONS_TODO.UNFINISHED }>Active</FilterLink>
      <FilterLink filter={ OPTIONS_TODO.FINISHED }>Completed</FilterLink>
    </div>
  </div>
);
export default Option;