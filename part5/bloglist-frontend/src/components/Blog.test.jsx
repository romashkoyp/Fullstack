import { render, screen } from '@testing-library/react'
import Blog from './Blog'

const blog = {
  title: 'My second blog with users connection',
  author: 'Me Uhgd',
  _url: 'http.www',
  likes: 10,
  user: {
    name: 'Mister X',
  }
}

test('title and author blog visible, but url and likes - not', async () => {
  const { container } = render(<Blog blog={blog} />)
  screen.debug()

  const blogContent = container.querySelector('.smallBlog')
  console.log(`TEXT FROM BLOGCONTENT: ${blogContent.textContent}`)
  expect(blogContent).toHaveTextContent(`${blog.title} - ${blog.author}`)
  expect(blogContent).not.toHaveTextContent(blog._url)
  expect(blogContent).not.toHaveTextContent(blog.likes)
})