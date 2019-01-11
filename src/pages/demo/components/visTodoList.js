import React from 'react';

const VisTodoList = ({ todos, clickOption }) => (
  <div>
    <ul>
      { todos.map(todo => (
        <li
          key={ todo.todoId }
          onClick={ () => { clickOption(todo.todoId); } }
          className={ todo.confirmTodo ? 'completed' : '' }
        >{ todo.todoText }</li>
      )) }
    </ul>
    <div className="no-data" style={{ 'display': todos.length === 0 ? 'block' : 'none'}}>
      还没有事项哦😯
    </div>
  </div>
);

export default VisTodoList;