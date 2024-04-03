import User from './User'
import { useSelector } from 'react-redux'

const UserList = ({ setUsers, blog }) => {
    const users = useSelector(state => state.user.users) || []
    const sortedUsers = Array.isArray(users) && users.length > 0
        ? [...users].sort((a, b) => b.blogs.length - a.blogs.length)
        : []

    return (
        <div>
            <h2>Users</h2>
            <table>
                <thead>
                    <tr>
                        <th></th>
                        <th>Blogs created</th>
                    </tr>
                </thead>
                <tbody>
                    {sortedUsers.map(user => 
                        <User key={user.id} user={user} setUsers={setUsers} blog={blog} />
                    )}
                </tbody>
            </table>
        </div>
    )
}

export default UserList