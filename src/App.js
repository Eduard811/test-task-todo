import React, { useEffect } from 'react'
import Modal from './components/Modal/Modal'
import Todos from './components/Todos/Todos'
import { useSelector } from 'react-redux'

const App = () => {
  const { isOpen, task } = useSelector((state) => state.todos)

  return (
    <div className="l-outer">
      <div className="l-content-section-inside">
        <Todos />
      </div>
      {isOpen && task && <Modal title={task[0].title} description={task[0].description} />}
    </div>
  )
}

export default App
