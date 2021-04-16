import Modal from './components/Modal/Modal'
import Todos from './components/Todos/Todos'
import { useSelector } from 'react-redux'

const App = () => {
  const { isOpen } = useSelector((state) => state.todos)
  return (
    <div className="l-outer">
      <div className="l-content-section-inside">
        <Todos />
      </div>
      {isOpen && <Modal />}
    </div>
  )
}

export default App
