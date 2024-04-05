import { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  BrowserRouter as Router,
  Routes, Route } from 'react-router-dom'
import blogService from './services/blogs'
import loginService from './services/login'
import logoutService from './services/logout'
import usersService from './services/users'
import BlogList from './components/blogList'
import UserList from './components/UserList'
import LoginForm from './components/loginForm'
import BlogForm from './components/blogForm'
import Menu from './components/Menu'
import IndividualBlog from './components/IndividualBlog'
import Togglable from './components/Togglable'
import Notification from './components/Notification'
import UserBlogs from './components/UserBlogs'
import { setNotification } from './reducers/notificationReducer'
import { setBlogs, addNewBlog } from './reducers/blogReducer'
import { setUserBlogs } from './reducers/userBlogReducer'
import {
  setUsername,
  selectUsername, 
  setPassword, 
  selectPassword, 
  setUser, 
  selectUser, 
  setUsers
} from './reducers/userReducer'
import { SecondaryButton } from './components/styles/Buttons'

const App = () => {
  const username = useSelector(selectUsername)
  const password = useSelector(selectPassword)
  const user = useSelector(selectUser)
  const blogFormRef = useRef()
  const dispatch = useDispatch()

  useEffect(() => {
    blogService
      .getAll()
      .then(initialBlogs =>
        dispatch(setBlogs(initialBlogs))
      )
  }, [dispatch])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      dispatch(setUser(user))
      blogService.setToken(user.token)
    }
  }, [dispatch])

  useEffect(() => {
    usersService
      .getAllUsers()
      .then(initialUsers =>
        dispatch(setUsers(initialUsers))
      )
  }, [dispatch])

  const addBlog = async (blogObject) => {
    try {
      const newBlog = await blogService.create(blogObject)
      dispatch(addNewBlog(newBlog))
      dispatch(setNotification(`A new blog ${newBlog.title} by ${newBlog.author} added`, 'success', 5))
      blogFormRef.current.toggleVisibility()
    } catch (exception) {
      dispatch(setNotification('Failed to create new blog', 'error', 5))
    }
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      dispatch(setUser(user))
      dispatch(setUsername(''))
      dispatch(setPassword(''))
    } catch (exception) {
      dispatch(setNotification('wrong username or password', 'error', 5))
    }
  }

  const handleLogout = async (event) => {
    event.preventDefault()
    try {
      await logoutService.logout()
      window.localStorage.removeItem('loggedBlogappUser')
      blogService.setToken(null)
      dispatch(setUser(null))
    } catch (exception) {
      dispatch(setNotification('logout failed', 'error', 5))
    }
  }

  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        <Notification />
        <LoginForm
          username={username}
          password={password}
          handleUsernameChange={(newUsername) => dispatch(setUsername(newUsername))}
          handlePasswordChange={(newPassword) => dispatch(setPassword(newPassword))}
          handleSubmit={handleLogin}
        />
      </div>
    )
  }

  return (
    <div>
      <Router>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Menu />
          <p>{user.name} logged in <SecondaryButton type="button" onClick={handleLogout}>logout</SecondaryButton></p>
        </div>
        <Notification />
        <h2>blog app</h2>
        <Routes>
          <Route path="/" element={
            <div>
              <Togglable buttonLabel="create new blog" ref={blogFormRef} setVisible={() => {}}>
                <BlogForm onSubmit={addBlog} />
              </Togglable>
              <BlogList user={user} setBlogs={setBlogs} />
            </div>
          } />
          <Route path="/users" element={<UserList user={user} setUsers={setUsers}/>} />
          <Route path="/users/:userId" element={<UserBlogs setUserBlogs={setUserBlogs}/>} />
          <Route path="/blogs/:blogId" element={<IndividualBlog user={user}/>} />
        </Routes>
      </Router>
    </div>
  )
}

export default App