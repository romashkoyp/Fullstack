import { createSlice } from '@reduxjs/toolkit'

const initialState = []

const blogSlice = createSlice({
    name: 'blog',
    initialState,
    reducers: {
        setBlogs(state, action) {
            return action.payload
        },
        addNewBlog(state, action) {
            state.push(action.payload)
        }
    }
})

export const { setBlogs, addNewBlog } = blogSlice.actions
export default blogSlice.reducer