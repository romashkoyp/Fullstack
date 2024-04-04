import { configureStore } from '@reduxjs/toolkit'
import notificationReducer from './notificationReducer'
import blogReducer from './blogReducer'
import userReducer from './userReducer'
import userBlogReducer from './userBlogReducer'

const store = configureStore({
    reducer: {
      notification: notificationReducer,
      blogs: blogReducer,
      user: userReducer,  
      userBlogs: userBlogReducer,
    }
  })

export default store