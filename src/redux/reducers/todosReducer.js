const TOGGLE_EDIT_MODE = 'TOGGLE_EDIT_MODE'
const ADD_TASK = 'ADD_TASK'
const OPEN_MODAL = 'OPEN_MODAL'
const CLOSE_MODAL = 'CLOSE_MODAL'

const initialState = {
  isOpen: false,
  //моковые данные
  todos: [
    {
      id: 1,
      title: 'В работе',
      editMode: false,
      tasks: [
        { id: 1, title: 'Пример текста карточки', description: '' },
        {
          id: 2,
          title: 'Пример длинного текста карточки, до такого чтобы он вообще не поместился',
          description: '',
        },
      ],
    },
    { id: 2, title: 'На проверке', editMode: false, tasks: [] },
    { id: 3, title: 'Выполнено', editMode: false, tasks: [] },
  ],
}

const todosReducer = (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_EDIT_MODE:
      return {
        ...state,
        ...state.todos.forEach((el) => {
          el.editMode = false
          if (el.id === action.id) {
            el.editMode = action.bool
          }
        }),
      }
    case ADD_TASK:
      return {
        ...state,
        ...state.todos.forEach((el) => {
          if (el.id === action.id) {
            el.tasks.push({ id: Math.random(), title: action.text, description: '' })
          }
        }),
      }
    case OPEN_MODAL:
      return {
        ...state,
        isOpen: true,
        task: state.todos
          .find((todo) => todo.id === action.todoId)
          .tasks.filter((task) => task.id === action.taskId),
      }
    case CLOSE_MODAL:
      return {
        ...state,
        isOpen: false,
      }
    default:
      return state
  }
}

export const toggleEditMode = (bool, id) => ({ type: TOGGLE_EDIT_MODE, bool, id })
export const addTask = (text, id) => ({ type: ADD_TASK, text, id })
export const openModal = (todoId, taskId) => ({ type: OPEN_MODAL, todoId, taskId })
export const closeModal = () => ({ type: CLOSE_MODAL })

export default todosReducer
