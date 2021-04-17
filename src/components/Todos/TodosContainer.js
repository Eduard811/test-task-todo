import { useSelector, useDispatch } from 'react-redux'
import Modal from '../../components/Modal/Modal'
import Todos from '../../components/Todos/Todos'
import { DragDropContext } from 'react-beautiful-dnd'
import { toggleIsActive } from '../../redux/reducers/todosReducer'

export const TodosContainer = () => {
  const { isOpen, task, todos } = useSelector((state) => state.todos)
  const dispatch = useDispatch()

  const reorder = (list, startIndex, endIndex) => {
    const result = todos.filter((el) => el.id === Number(list))[0]
    const [removed] = result.tasks.splice(startIndex, 1)
    result.tasks.splice(endIndex, 0, removed)

    return result
  }

  const move = (source, destination, droppableSource, droppableDestination) => {
    const sourceClone = todos.filter((el) => el.id === Number(source))[0]
    const destClone = todos.filter((el) => el.id === Number(destination))[0]
    const [removed] = sourceClone.tasks.splice(droppableSource.index, 1)

    destClone.tasks.splice(droppableDestination.index, 0, removed)

    const result = {}
    result[droppableSource.droppableId] = sourceClone
    result[droppableDestination.droppableId] = destClone

    return result
  }

  const onDragStart = (result) => {
    const { source, draggableId } = result
    dispatch(toggleIsActive(true, source.droppableId, draggableId))
  }

  const onDragEnd = (result) => {
    const { source, destination, draggableId } = result
    dispatch(toggleIsActive(false, source.droppableId, draggableId))

    if (!destination) return

    if (source.droppableId === destination.droppableId) {
      reorder(source.droppableId, source.index, destination.index)
    } else {
      move(source.droppableId, destination.droppableId, source, destination)
    }
  }

  return (
    <DragDropContext onDragEnd={onDragEnd} onDragStart={onDragStart}>
      <div className="l-outer">
        <div className="l-content-section-inside">
          <Todos />
        </div>
        {isOpen && task && <Modal title={task.title} description={task.description} />}
      </div>
    </DragDropContext>
  )
}

export default TodosContainer
