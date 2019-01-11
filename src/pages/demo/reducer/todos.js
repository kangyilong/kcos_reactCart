import { ADD_TODO, CONFIRM_TODO } from "../actionFig/actionFig";

function todo(state, action) {
  switch(action.type) {
    case ADD_TODO:
      return {
        todoText: action.todoText,
        confirmTodo: false,
        todoId: action.todoId
      };
    case CONFIRM_TODO:
      if(state.todoId !== action.todoId) {
        return state;
      }
      return {
        ...state,
        confirmTodo: !state.confirmTodo
      };
    default:
      return state;
  }
}

export default function todos(state=[], action) {
  switch (action.type) {
    case ADD_TODO:
      return [
        ...state,
        todo(undefined, action)
      ];
    case CONFIRM_TODO:
      return state.map(item => todo(item, action));
    default:
      return state;
  }
}