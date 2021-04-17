import React, { useEffect, useRef, useState } from 'react'
import { Cancel } from '../common/Svg'
import { useDispatch } from 'react-redux'
import { closeModal, saveText } from '../../redux/reducers/todosReducer'

const Modal = ({ title, description }) => {
  const dispatch = useDispatch()
  const node = useRef()
  const [text, setText] = useState(description)

  const handleOutsideClick = (event) => {
    const path = event.path || (event.composedPath && event.composedPath())
    if (!path.includes(node.current)) {
      dispatch(closeModal())
      setText(description)
    }
  }

  useEffect(() => {
    document.body.addEventListener('click', handleOutsideClick)
    document.body.classList.add('open-modal')

    return () => {
      document.body.removeEventListener('click', handleOutsideClick)
      document.body.classList.remove('open-modal')
    }
  }, [])

  const onCloseModal = () => {
    dispatch(closeModal())
    setText(description)
  }

  const onSaveText = () => {
    dispatch(saveText(text))
    dispatch(closeModal())
  }

  return (
    <div className="b-modal">
      <div className="b-modal__inside" ref={node}>
        <div className="b-modal__header">
          <h3>{title}</h3>
          <button className="b-modal__button" onClick={onCloseModal}>
            <Cancel />
          </button>
        </div>
        <div className="b-modal__body">
          <textarea value={text} placeholder="Описание" onChange={(e) => setText(e.target.value)} />
        </div>
        <div className="b-modal__footer">
          <button className="b-button-secondary" onClick={onSaveText}>
            Сохранить
          </button>
        </div>
      </div>
    </div>
  )
}

export default Modal
