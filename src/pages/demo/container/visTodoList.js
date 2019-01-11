/* eslint-disable react/react-in-jsx-scope */
import React from 'react';
import { connect } from 'react-redux';
import { OPTIONS_TODO } from '../actionFig/actionFig';
import { confirmTodo } from '../actions/action';
import VisTodoList from '../components/visTodoList';

const VisTodos = (todos, filter) => {
  switch(filter) {
    case OPTIONS_TODO.SHOW_ALL:
      return todos;
    case OPTIONS_TODO.FINISHED:
      return todos.filter(v => v.confirmTodo);
    case OPTIONS_TODO.UNFINISHED:
      return todos.filter(v => !v.confirmTodo);
    default:
      return [];
  }
};

const mapStateToProps = (state) => {
  return {
    todos: VisTodos(state.todos, state.optionsTodo)
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    clickOption: (todoId) => {
      dispatch(confirmTodo(todoId));
    }
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(VisTodoList);