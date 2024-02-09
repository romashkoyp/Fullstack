import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Error from './components/Error'
import Success from './components/Success'
import blogService from './services/blogs'
import loginService from './services/login'
import logoutService from './services/logout'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)
  const [successMessage, setSuccessMessage] = useState(null)
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

  const showMessage = (message, setMessageFunction) => {
    setMessageFunction(message)
    setTimeout(() => {
      setMessageFunction(null)
    }, 6000)
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
      setErrorMessage('wrong username or password')
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
    //  title: title,
    //  author: author,
    //  _url: url,
    //})

    const blogObject = {
      title: title,
      author: author,
      _url: url,
    }
  
    blogService
      .create(blogObject)
        .then(returnedBlog => {
        setBlogs(blogs.concat(returnedBlog))
        setTitle('')
        setAuthor('')
        setUrl('')
        showMessage(`New blog ${title} by author ${author} added`, setSuccessMessage)
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
          value={title}
          name="title"
          onChange={({ target }) => setTitle(target.value)}
        />
      </div>
      <div>
        author
        <input
          type="text"
          value={author}
          name="author"
          onChange={({ target }) => setAuthor(target.value )}
        />
      </div>
      <div>
        url
        <input
          type="text"
          value={url}
          name="url"
          onChange={({ target }) => setUrl(target.value)}
        />
      </div>
      <button type="submit">create</button>
    </form>
  )
  
  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        <Error message={errorMessage} />
        <Success message={successMessage} />
        {loginForm()}
      </div>
    )
  }

  return (
    <div>
      <h2>blogs</h2>
      <Error message={errorMessage} />
      <Success message={successMessage} />
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