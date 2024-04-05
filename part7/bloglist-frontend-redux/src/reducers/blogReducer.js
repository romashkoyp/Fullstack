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
    },
    addComments(state, action) {
      const blogToUpdate = state.find(blog => blog.id === action.payload.id)
      if (blogToUpdate) {
        blogToUpdate.comments = blogToUpdate.comments.concat(action.payload.comments)
      }
    }
  },
})

export const { setBlogs, addNewBlog, incrementLikes, deleteBlog, addComments } = blogSlice.actions
export default blogSlice.reducer