const dummy = (blogs) => {
  return 1
}

const totalLikes = (listOfBlogs) => {
  return listOfBlogs.reduce((total, blog) => total + blog.likes, 0)
}


const favoriteBlog = (listOfBlogs) => {
  return listOfBlogs.reduce((current, blog) => {
    return blog.likes > current.likes ? blog : current
  }, { title: null, author: null, likes: 0 })
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog
}