import React from 'react'
import TodoListItem from './TodoListItem'
import Card from '@mui/material/Card'

const TodoList = ({todos, onRemove, onToggle}) => {

  return (
    <Card className="TodoList">
      {todos.map(todo => (
        <TodoListItem 
          todo={todo} 
          key={todo.id} 
          onRemove={onRemove}
          onToggle={onToggle}
          />
        //map을 사용하여 컴포넌트를 변환할 때는 key props를 전달해야한다.
      ))}
    </Card>
  )
}

export default TodoList
