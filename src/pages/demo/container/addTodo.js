/* eslint-disable react/react-in-jsx-scope */
import { connect } from 'react-redux';
import { addTodo, conMsg } from '../actions/action';
import React from 'react';
let addValue = null;
let AddTodo = ({ dispatch }) => (
  <div>
    <input type="text" ref={ node => { addValue = node } }/>
    <button onClick={ () => {
      if(!addValue.value.trim()) {
        return;
      }
      dispatch(addTodo(addValue.value));
      dispatch(conMsg());
      addValue.value = '';
    } }>添加</button>
  </div>
);

export default connect()(AddTodo);