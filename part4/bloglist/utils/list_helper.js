const dummy = (blogs) => {
  return 1
}

const totalLikes = (listOfBlogs) => {
  const sum = listOfBlogs.reduce((total, blog) => total + blog.likes, 0)
  return sum
}

module.exports = {
  dummy,
  totalLikes
}