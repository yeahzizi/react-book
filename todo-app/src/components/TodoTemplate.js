import React from 'react'
// import './TodoTemplate.scss'
import Card from '@mui/material/Card'
import './TodoTemplate.css'

const TodoTemplate = ({ children }) => {
  return (

    <Card variant="outlined" square className="TodoTemplate">
      <div className="app-title">일정 관리</div>
      <div className="content">{children}</div>
    </Card>
  )
}

export default TodoTemplate
