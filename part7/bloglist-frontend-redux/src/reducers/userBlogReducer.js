import { createSlice } from '@reduxjs/toolkit'

const initialState = []

const userBlogSlice = createSlice({
    name: 'userBlogs',
    initialState,
    reducers: {
      setUserBlogs(state, action) {
        return action.payload
      },
    },
  })
  
  export const { setUserBlogs } = userBlogSlice.actions
  export default userBlogSlice.reducer