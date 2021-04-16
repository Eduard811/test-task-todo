const TOGGLE_EDIT_MODE = 'TOGGLE_EDIT_MODE'
const ADD_TASK = 'ADD_TASK'

const initialState = {
  //моковые данные
  todos: [
    {
      id: 1,
      title: 'В работе',
      editMode: false,
      tasks: [
        { title: 'Пример текста карточки', description: '' },
        {
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
          if (el.id === action.id && action.text) {
            el.tasks.push({ title: action.text, description: '' })
          }
        }),
      }
    default:
      return state
  }
}

export const toggleEditMode = (bool, id) => ({ type: TOGGLE_EDIT_MODE, bool, id })
export const addTask = (text, id) => ({ type: ADD_TASK, text, id })

export default todosReducer
