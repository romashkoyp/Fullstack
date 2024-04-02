import { useState, useEffect, useRef } from 'react'
import { useDispatch } from 'react-redux'
import blogService from './services/blogs'
import loginService from './services/login'
import logoutService from './services/logout'
import BlogList from './components/blogList'
import LoginForm from './components/loginForm'
import BlogForm from './components/blogForm'
import Togglable from './components/Togglable'
import Notification from './components/Notification'
import { setNotification } from './reducers/notificationReducer'
import { setBlogs, addNewBlog } from './reducers/blogReducer'

const App = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
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
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

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
      setUser(user)
      setUsername('')
      setPassword('')
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
      setUser(null)
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
          handleUsernameChange={({ target }) => setUsername(target.value)}
          handlePasswordChange={({ target }) => setPassword(target.value)}
          handleSubmit={handleLogin}
        />
      </div>
    )
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification />
      <p>
        {user.name} logged in <button type="button" onClick={handleLogout}>logout</button>
      </p>
      <Togglable buttonLabel="create new blog" ref={blogFormRef} setVisible={() => {}}>
        <BlogForm onSubmit={addBlog} />
      </Togglable>
      <br />
      <BlogList user={user} setBlogs={setBlogs} />
    </div>
  )
}

export default App