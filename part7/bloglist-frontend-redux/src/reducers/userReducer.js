import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    username: '',
    password: '',
    user: null,
    users: []
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUsername(state, action) {
            return {
                ...state,
                username: action.payload
            }
        },
        setPassword(state, action) {
            return {
                ...state,
                password: action.payload
            }
        },
        setUser(state, action) {
            return {
              ...state,
              user: action.payload
            }
        },
        setUsers(state, action) {
            return {
              ...state,
              users: action.payload
            }
        }
    }
})

export const { setUsername, setPassword, setUser, setUsers } = userSlice.actions
export const selectUsername = (state) => state.user.username
export const selectPassword = (state) => state.user.password
export const selectUser = (state) => state.user.user
export const selectUsers = (state) => state.users

export default userSlice.reducer