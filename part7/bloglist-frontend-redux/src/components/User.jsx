import React from 'react'

const User = ({ user }) => {
    return (
        <React.Fragment>
            <tr>
                <td>{user.name}</td>
                <td>{user.blogs.length}</td>
            </tr>
        </React.Fragment>
    )
}

export default User