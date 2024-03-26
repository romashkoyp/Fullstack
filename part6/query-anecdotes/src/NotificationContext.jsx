import React, { createContext, useReducer } from 'react'
import PropTypes from 'prop-types'

const initialState = { message: '', timeoutId: null }

const notificationReducer = (state, action) => {
  switch (action.type) {
    case 'SET_NOTIFICATION':
      return { message: action.payload, timeoutId: 5 }
    case 'CLEAR_NOTIFICATION':
      return { message: '', timeoutId: null }
    default:
      return state
  }
}

export const NotificationContext = createContext(initialState)

export const NotificationProvider = ({ children }) => {
  const [state, dispatch] = useReducer(notificationReducer, initialState)

  return (
    <NotificationContext.Provider value={{ state, dispatch }}>
      {children}
    </NotificationContext.Provider>
  )
}

NotificationProvider.propTypes = {
    children: PropTypes.node.isRequired,
  }