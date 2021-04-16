import React, { useEffect, useRef } from 'react'
import { Cancel } from '../common/Svg'
import { useDispatch } from 'react-redux'
import { closeModal } from '../../redux/reducers/todosReducer'

const Modal = () => {
  const dispatch = useDispatch()
  const node = useRef()

  const handleOutsideClick = (event) => {
    const path = event.path || (event.composedPath && event.composedPath())
    if (!path.includes(node.current)) {
      dispatch(closeModal())
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
  }

  return (
    <div className="b-modal">
      <div className="b-modal__inside" ref={node}>
        <div className="b-modal__header">
          <h3>Пример длинного текста карточки, до такого чтобы он вообще не поместился</h3>
          <button className="b-modal__button" onClick={onCloseModal}>
            <Cancel />
          </button>
        </div>
        <div className="b-modal__body">
          <textarea placeholder="Описание" />
        </div>
        <div className="b-modal__footer">
          <button className="b-button-secondary">Сохранить</button>
        </div>
      </div>
    </div>
  )
}

export default Modal
