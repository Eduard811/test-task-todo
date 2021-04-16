import { useSelector, useDispatch } from 'react-redux'
import { toggleEditMode } from '../../redux/reducers/todosReducer'
import { Cancel, Plus } from '../common/Svg'

const Todos = () => {
  const { todos } = useSelector((state) => state.todos)
  const dispatch = useDispatch()

  const onChangeEditMode = (bool, id) => {
    dispatch(toggleEditMode(!bool, id))
  }

  return (
    <div className="b-todos">
      {todos.map((el) => (
        <div className="b-todos__todo" key={el.id}>
          <h5 className="b-todos__todo__title">{el.title}</h5>
          <ul className="b-todos__todo__collection">
            <li className="b-todos__todo__clause"></li>
          </ul>
          {el.editMode ? (
            <div className="b-todos__todo__button">
              <button className="b-button-secondary">Добавить карточку</button>
              <button className="b-button" onClick={() => onChangeEditMode(el.editMode, el.id)}>
                <Cancel />
                Отмена
              </button>
            </div>
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
