// App에서 useState를 사용하여 todos 라는 상태를 정의하고, 
// todos를 TodoList의 props로 전달
import React, { useState, useRef, useCallback } from 'react'
import './App.css';
import TodoTemplate from './components/TodoTemplate';
import TodoInsert from './components/TodoInsert';
import TodoList from './components/TodoList';

const App = () => {
  const [todos, setTodos] = useState([
    {
      id: 1,
      text: '리액트 공부하기',
      checked: true,
    },
    {
      id: 2,
      text: 'todo 기능 구현하기',
      checked: true,
    },
    {
      id: 3,
      text: 'styled-component 적용하기',
      checked: false,
    },
  ])

  const nextId = useRef(4)

  const onInsert = useCallback(
    text => {
      const todo = {
        id: nextId.current,
        text,
        checked: false
      }
      setTodos(todos.concat(todo))
      nextId.current += 1
    },
    [todos],
  )
  const onRemove = useCallback(
    id => {
      setTodos(todos.filter(todo => todo.id !==id))
    },
    [todos],
  )
  const onToggle = useCallback(
    id => {
      setTodos(
        todos.map(todo =>
          todo.id === id ? {...todo, checked: !todo.checked} : todo,
          ),
      )
    },
    [todos],
  )
  return (
    <TodoTemplate>
      <TodoInsert onInsert={onInsert}/>
      <TodoList todos={todos} onRemove={onRemove} onToggle={onToggle}/>
    </TodoTemplate>
    
  );
}

export default App;
