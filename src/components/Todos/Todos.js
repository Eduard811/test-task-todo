import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { toggleEditMode, addTask, openModal } from '../../redux/reducers/todosReducer'
import { Cancel, Plus } from '../common/Svg'
import { Link } from 'react-router-dom'
import { Droppable, Draggable } from 'react-beautiful-dnd'

const Todos = () => {
  const { todos, styledTask } = useSelector((state) => state.todos)
  const dispatch = useDispatch()

  const [text, setText] = useState('')

  const onChangeEditMode = (bool, id) => {
    dispatch(toggleEditMode(!bool, id))
    setText('')
  }

  const onAddTask = (id) => {
    if (!!text) {
      dispatch(addTask(text, id))
      setText('')
    }
  }

  const onOpenModal = (todoId, taskId) => {
    dispatch(openModal(todoId, taskId))
  }

  return (
    <div className="b-todos">
      {todos.map((el) => (
        <div className="b-todos__todo" key={el.id}>
          <h5 className="b-todos__todo__title">{el.title}</h5>
          <Droppable droppableId={el.id.toString()}>
            {(provided) => (
              <div {...provided.droppableProps} ref={provided.innerRef}>
                {el.tasks.length > 0 && (
                  <ul className="b-todos__todo__collection">
                    {el.tasks.map((task, index) => (
                      <Draggable key={task.id} draggableId={task.id.toString()} index={index}>
                        {(provided) => (
                          <Link
                            {...provided.draggableProps}
                            ref={provided.innerRef}
                            {...provided.dragHandleProps}
                            to={`/${task.id}`}
                            className={`b-todos__todo__clause ${
                              styledTask && styledTask.isActive && styledTask.id === task.id ? 'active' : ''
                            }`}
                            onClick={() => onOpenModal(el.id, task.id)}
                          >
                            <li>
                              {task.title.length > 61 ? task.title.slice(0, 61) + ' ' + '...' : task.title}
                            </li>
                          </Link>
                        )}
                      </Draggable>
                    ))}
                  </ul>
                )}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
          {el.editMode ? (
            <>
              <div className="b-todos__todo__input">
                <textarea
                  onChange={(e) => setText(e.target.value)}
                  value={text}
                  placeholder="Введите текст карточки"
                />
              </div>
              <div className="b-todos__todo__button">
                <button className="b-button-secondary" onClick={() => onAddTask(el.id)}>
                  Добавить карточку
                </button>
                <button className="b-button" onClick={() => onChangeEditMode(el.editMode, el.id)}>
                  <Cancel />
                  Отмена
                </button>
              </div>
            </>
          ) : (
            <div className="b-todos__todo__button">
              <button className="b-button" onClick={() => onChangeEditMode(el.editMode, el.id)}>
                <Plus />
                Добавить еще одну карточку
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
  )
}

export default Todos
