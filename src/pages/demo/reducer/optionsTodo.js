import { OPTIONS_TODO } from '../actionFig/actionFig';

export default function optionsTodo(state=OPTIONS_TODO.SHOW_ALL, action) {
  switch(action.type) {
    case 'OPTIONS_TODO':
      return action.filter;
    default:
      return state;
  }
}