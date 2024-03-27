import React, { createContext, useReducer } from 'react'
import PropTypes from 'prop-types'

const initialState = { message: '', type: 'success' }

const notificationReducer = (state, action) => {
  switch (action.type) {
    case 'SET_NOTIFICATION':
      return action.payload
    case 'CLEAR_NOTIFICATION':
      return { message: '', type: 'success' }
    default:
      return state
  }
}

export const NotificationContext = createContext(initialState)

export const NotificationProvider = ({ children }) => {
  const [state, dispatch] = useReducer(notificationReducer, initialState)

  const showNotification = async (message, type = 'success') => {
    dispatch({ type: 'SET_NOTIFICATION', payload: { message, type } })
    await new Promise((resolve) => setTimeout(resolve, 5000))
    dispatch({ type: 'CLEAR_NOTIFICATION' })
  }

  return (
    <NotificationContext.Provider value={{ state, dispatch, showNotification }}>
      {children}
    </NotificationContext.Provider>
  )
}

NotificationProvider.propTypes = {
    children: PropTypes.node.isRequired,
  }