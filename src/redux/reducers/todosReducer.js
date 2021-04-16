const TOGGLE_EDIT_MODE = 'TOGGLE_EDIT_MODE'

const initialState = {
  //моковые данные
  todos: [
    { id: 1, title: 'В работе', editMode: false, task: [] },
    { id: 2, title: 'На проверке', editMode: false, task: [] },
    { id: 3, title: 'Выполнено', editMode: false, task: [] },
  ],
}

const todosReducer = (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_EDIT_MODE:
      return {
        ...state,
        ...state.todos.forEach((el) => {
          if (el.id === action.id) {
            el.editMode = action.bool
          }
        }),
      }
    default:
      return state
  }
}

export const toggleEditMode = (bool, id) => ({ type: TOGGLE_EDIT_MODE, bool, id })

export default todosReducer
