/* eslint-disable react/react-in-jsx-scope */
import { connect } from 'react-redux';
import { optionsTodo } from '../actions/action';
import React from 'react';
// const FilterLink = ({ active, clickOption, children}) => (
//
// );

class FilterLink extends React.Component{
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <span
        className={ this.props.active ? 'on' : '' }
        onClick={ () => {
          this.props.clickOption();
        } }
      >{ this.props.children }</span>
    )
  }
}

const mapStateToProps = (state, newProps) => {
  return {
    active: newProps.filter === state.optionsTodo
  }
};

const mapDispatchToProps = (dispatch, newProps) => {
  return {
    clickOption: () => {
      dispatch(optionsTodo(newProps.filter));
    }
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FilterLink);