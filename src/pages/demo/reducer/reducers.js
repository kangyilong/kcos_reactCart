import todos from './todos';
import optionsTodo from './optionsTodo';
import { combineReducers } from 'redux';

export default combineReducers({
  todos,
  optionsTodo
})