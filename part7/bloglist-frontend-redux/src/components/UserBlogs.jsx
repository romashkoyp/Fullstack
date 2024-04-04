import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { setUserBlogs } from '../reducers/userBlogReducer'
import { useEffect } from 'react'
import blogService from '../services/blogs'

const UserBlogs = () => {
    const { userId } = useParams()
    const users = useSelector(state => state.user.users)
    const user = users.find(u => u.id === userId)
    const userName = user ? user.name : ''
    const userBlogs = useSelector(state => state.userBlogs)
    const dispatch = useDispatch()

    useEffect(() => {
        blogService
            .getBlogsByUserId(userId)
            .then(fetchedUserBlogs =>
                dispatch(setUserBlogs(fetchedUserBlogs))
            )
        }, [dispatch, userId])

        return (
            <div>
                <h2>{userName}</h2>
                <h3>added blogs</h3>
                {userBlogs && userBlogs.length > 0 ? (
                    userBlogs.map(blog => (
                        <div key={blog.id}>
                            <ul>
                                <li>{blog.title}</li>
                            </ul>
                        </div>
                    ))
                ) : (
                    <p>No blogs added by this user</p>
                )}
            </div>
    )
}

export default UserBlogs