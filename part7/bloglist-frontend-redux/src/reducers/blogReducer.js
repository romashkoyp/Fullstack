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
        },
        incrementLikes(state, action) {
            const blogToUpdate = state.find(blog => blog.id === action.payload.id)
            if (blogToUpdate) {
                blogToUpdate.likes = action.payload.likes
            }
        },
        deleteBlog(state, action) {
            return state.filter(blog => blog.id !== action.payload)
        }
    }
})

export const { setBlogs, addNewBlog, incrementLikes, deleteBlog } = blogSlice.actions
export default blogSlice.reducer