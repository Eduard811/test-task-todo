import { useSelector } from 'react-redux'
import Modal from '../../components/Modal/Modal'
import Todos from '../../components/Todos/Todos'

export const TodosContainer = () => {
  const { isOpen, task } = useSelector((state) => state.todos)

  return (
    <div className="l-outer">
      <div className="l-content-section-inside">
        <Todos />
      </div>
      {isOpen && task && <Modal title={task.title} description={task.description} />}
    </div>
  )
}

export default TodosContainer
