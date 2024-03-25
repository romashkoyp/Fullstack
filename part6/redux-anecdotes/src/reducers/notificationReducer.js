import { createSlice } from '@reduxjs/toolkit'

const initialState = { message: '', timeoutId: null }

const notificationSlice = createSlice({
    name: 'notification',
    initialState,
    reducers: {
        notificationToShow(state, action) {
            const { message, timeoutId } = action.payload
            state.message = message
            state.timeoutId = timeoutId
        },
        notificationToHide(state) {
            state.message = ''
            state.timeoutId = null
        }
    }
})

export const { notificationToShow, notificationToHide } = notificationSlice.actions

export const setNotification = (message, duration) => {
    return async dispatch => {
        const timeoutId = setTimeout(() => {
            dispatch(notificationToHide())
        }, duration * 1000)
        dispatch(notificationToShow({ message, timeoutId }))
    }
}

export default notificationSlice.reducer