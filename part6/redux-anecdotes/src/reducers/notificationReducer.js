import { createSlice } from '@reduxjs/toolkit'

const initialState = { message: '', timeoutId: null }

const notificationSlice = createSlice({
    name: 'notification',
    initialState,
    reducers: {
        notificationToShow(state, action) {
            const message = action.payload
            state.message = message
        },
        notificationToHide(state) {
            state.message = ''
        }
    }
})

export const { notificationToShow, notificationToHide } = notificationSlice.actions
export default notificationSlice.reducer