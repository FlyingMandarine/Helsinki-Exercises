import React from 'react'

import userService from '../services/users'

const UserDetails = async () => {

    const users = await userService.getUsers()
    console.log('users is', users)

    return (
        <div>
            <h2>Users</h2>

            {/* {
                users.map(user =>
                    <div key={ user.id }>{ user.username }</div>
                )
            } */}

            <table>
                <tbody>
                    <tr>
                        <th></th>
                        <th>blogs created</th>
                    </tr>
                    <tr>
                        <td>Patrice</td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

export default UserDetails