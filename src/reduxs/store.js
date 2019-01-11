import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import getWantData from './reducers';

const store = createStore(getWantData, compose(
  applyMiddleware(thunk)
));

export default store;