const TOGGLE_EDIT_MODE = 'TOGGLE_EDIT_MODE'
const ADD_TASK = 'ADD_TASK'
const OPEN_MODAL = 'OPEN_MODAL'
const CLOSE_MODAL = 'CLOSE_MODAL'
const SAVE_TEXT = 'SAVE_TEXT'
const TOGGLE_IS_ACTIVE = 'TOGGLE_IS_ACTIVE'
//id должен быть уникальным
const initialState = {
  isOpen: false,
  todos: [
    {
      id: 1,
      title: 'В работе',
      editMode: false,
      tasks: [
        { id: 1, title: 'Пример текста карточки', description: '', isActive: false },
        {
          id: 2,
          title: 'Пример длинного текста карточки, до такого чтобы он вообще не поместился',
          description: 'Какой то текст',
          isActive: false,
        },
      ],
    },
    { id: 2, title: 'На проверке', editMode: false, tasks: [] },
    { id: 3, title: 'Выполнено', editMode: false, tasks: [] },
    // {
    //   id: Math.random(),
    //   title: 'тест1',
    //   editMode: false,
    //   tasks: [
    //     { id: Math.random(), title: 'Пример текста карточки', description: '', isActive: false },
    //     {
    //       id: Math.random(),
    //       title: 'Пример длинного текста карточки, до такого чтобы он вообще не поместился',
    //       description: 'Какой то текст',
    //       isActive: false,
    //     },
    //     { id: Math.random(), title: 'Пример текста карточки', description: '', isActive: false },
    //     {
    //       id: Math.random(),
    //       title: 'Пример длинного текста карточки, до такого чтобы он вообще не поместился',
    //       description: 'Какой то текст',
    //       isActive: false,
    //     },
    //     { id: Math.random(), title: 'Пример текста карточки', description: '', isActive: false },
    //     {
    //       id: Math.random(),
    //       title: 'Пример длинного текста карточки, до такого чтобы он вообще не поместился',
    //       description: 'Какой то текст',
    //       isActive: false,
    //     },
    //   ],
    // },
    // { id: Math.random(), title: 'тест2', editMode: false, tasks: [] },
    // { id: Math.random(), title: 'тест3', editMode: false, tasks: [] },
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
            el.tasks.push({ id: Math.random(), title: action.text, description: '', isActive: false })
          }
        }),
      }
    case OPEN_MODAL:
      return {
        ...state,
        isOpen: true,
        task: state.todos
          .find((todo) => todo.id === action.todoId)
          .tasks.filter((task) => task.id === action.taskId)[0],
      }
    case CLOSE_MODAL:
      return {
        ...state,
        isOpen: false,
      }
    case SAVE_TEXT:
      state.task.title = action.modalTitle
      state.task.description = action.text
      return {
        ...state,
      }
    case TOGGLE_IS_ACTIVE:
      return {
        ...state,
        styledTask: {
          ...state.todos
            .find((todo) => Number(todo.id) === Number(action.todoId))
            .tasks.find((task) => Number(task.id) === Number(action.taskId)),
          isActive: action.bool,
        },
      }
    default:
      return state
  }
}

export const toggleEditMode = (bool, id) => ({ type: TOGGLE_EDIT_MODE, bool, id })
export const addTask = (text, id) => ({ type: ADD_TASK, text, id })
export const openModal = (todoId, taskId) => ({ type: OPEN_MODAL, todoId, taskId })
export const closeModal = () => ({ type: CLOSE_MODAL })
export const saveText = (modalTitle, text) => ({ type: SAVE_TEXT, text, modalTitle })
export const toggleIsActive = (bool, todoId, taskId) => ({ type: TOGGLE_IS_ACTIVE, bool, todoId, taskId })

export default todosReducer
