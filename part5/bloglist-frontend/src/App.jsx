import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'
import logoutService from './services/logout'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [newBlog, setNewBlog] = useState({title: '', author: '', url: ''})
  const [errorMessage, setErrorMessage] = useState(null)
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  useEffect(() => {
    blogService
    .getAll()
    .then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

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
      setErrorMessage('wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
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
      setErrorMessage('logout failed');
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000)
    }
  }

  const addBlog = (event) => {
    event.preventDefault()

    //console.log('New Blog Object:', {
    //  title: newBlog.title,
    //  author: newBlog.author,
    //  _url: newBlog.url,
    //})

    const blogObject = {
      title: newBlog.title,
      author: newBlog.author,
      _url: newBlog.url,
    }
  
    blogService
      .create(blogObject)
        .then(returnedBlog => {
        setBlogs(blogs.concat(returnedBlog))
        setNewBlog('')
      })
  }

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        username
          <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
          <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>      
  )

  const blogForm = () => (
    <form onSubmit={addBlog}>
      <div>
        title
        <input
          type="text"
          value={newBlog.title || ''}
          name="title"
          onChange={({ target }) => setNewBlog({ ...newBlog, title: target.value })}
        />
      </div>
      <div>
        author
        <input
          type="text"
          value={newBlog.author || ''}
          name="author"
          onChange={({ target }) => setNewBlog({ ...newBlog, author: target.value })}
        />
      </div>
      <div>
        url
        <input
          type="text"
          value={newBlog.url || ''}
          name="url"
          onChange={({ target }) => setNewBlog({ ...newBlog, url: target.value })}
        />
      </div>
      <button type="submit">create</button>
    </form>
  )
  
  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        <Notification message={errorMessage} />
        {loginForm()}
      </div>
    )
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification message={errorMessage} />
      <p>
        {user.name} logged in 
        <button type="button" onClick={handleLogout}>logout</button>
      </p>
      
      <h2>create new</h2>
      {blogForm()}
      <p></p>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App