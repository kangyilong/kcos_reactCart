import { ADD_TODO, CONFIRM_TODO } from '../actionFig/actionFig';

let todoId = 0;
export function addTodo(text) {
  return {
    type: ADD_TODO,
    todoId: todoId ++,
    todoText: text
  }
}

export function confirmTodo(todoId) {
  return {
    type: CONFIRM_TODO,
    todoId
  }
}

export function optionsTodo(filter) {
  return {
    type: 'OPTIONS_TODO',
    filter
  }
}

export function conMsg() {
  return (dispatch, getState) => {
    dispatch(optionsTodo('FINISHED'));
  }
}