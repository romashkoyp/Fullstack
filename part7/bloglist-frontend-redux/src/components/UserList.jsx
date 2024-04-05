import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const UserList = () => {
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
                    {sortedUsers.map(user => (
                        <tr key={user.id}>
                            <td>
                                <Link to={`/users/${user.id}`}>{user.name}</Link>
                            </td>
                            <td>{user.blogs.length}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default UserList