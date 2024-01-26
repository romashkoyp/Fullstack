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

const mostBlogs = (listOfBlogs) => {

  const authorCount = {}

  listOfBlogs.forEach(blog => {
    const author = blog.author

    if (!authorCount[author]) {
      authorCount[author] = 1
    } else {
      authorCount[author]++
    }
  })

  let maxAuthor = null
  let maxBlogs = 0

  for (const author in authorCount) {
    if (authorCount[author] > maxBlogs) {
      maxAuthor = author
      maxBlogs = authorCount[author]
    }
  }

  return {
    maxAuthor,
    maxBlogs
  }
}

const mostLikes = (listOfBlogs) => {

  const likesCount = {}

  listOfBlogs.forEach(blog => {
    const author = blog.author
    const likes = blog.likes

    if (!likesCount[author]) {
      likesCount[author] = likes
    } else {
      likesCount[author] += likes
    }
  })

  let maxAuthor = null
  let maxLikes = 0

  for (const author in likesCount) {
    if (likesCount[author] > maxLikes) {
      maxAuthor = author
      maxLikes = likesCount[author]
    }
  }

  return {
    maxAuthor,
    maxLikes
  }
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}