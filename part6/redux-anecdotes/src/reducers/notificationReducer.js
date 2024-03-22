import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
    name: 'notification',
    initialState: 'default notification message',
    reducers: {
        notificationToShow(state, action) {
            return action.payload
        }
    }
})

export const { notificationToShow } = notificationSlice.actions
export default notificationSlice.reducer