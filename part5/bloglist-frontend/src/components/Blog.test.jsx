import React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

const blog = {
  id: '12345',
  title: 'My second blog with users connection',
  author: 'Me Uhgd',
  _url: 'http.www',
  likes: 10,
  user: {
    name: 'John'
  }
}

test('title and author blog visible, but url and likes - not', async () => {
  const { container } = render(<Blog blog={blog} />)
  screen.debug()

  const blogSmallContent = container.querySelector('.smallBlog')
  console.log(`TEXT FROM BLOGCONTENT: ${blogSmallContent.textContent}`)
  expect(window.getComputedStyle(blogSmallContent).display).toBe('block') //visible
  expect(blogSmallContent).toHaveTextContent(`${blog.title} - ${blog.author}`)
  expect(blogSmallContent).not.toHaveTextContent(blog._url)
  expect(blogSmallContent).not.toHaveTextContent(blog.likes)

  const blogBigContent = container.querySelector('.bigBlog')
  expect(window.getComputedStyle(blogBigContent).display).toBe('none') //hidden
})

test('URL and likes are shown when the button \'view\' has been clicked', async () => {

  const { container } = render(<Blog blog={blog} />)
  const user = userEvent.setup()
  const button = screen.getByText('view')
  screen.debug(button)
  await user.click(button)

  const blogBigContent = container.querySelector('.bigBlog')
  screen.debug()
  expect(window.getComputedStyle(blogBigContent).display).toBe('block') //visible
  expect(blogBigContent).toHaveTextContent(blog._url)
  expect(blogBigContent).toHaveTextContent(blog.likes)

  const blogSmallContent = container.querySelector('.smallBlog')
  expect(window.getComputedStyle(blogSmallContent).display).toBe('none') //hidden
})



