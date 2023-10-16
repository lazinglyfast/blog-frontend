import React from "react"
import { useQuery } from "@tanstack/react-query"
import userService from "../services/user"

const UserList = () => {
  const query = useQuery({
    queryKey: ["users"],
    queryFn: userService.list,
  })

  if (query.isLoading) {
    return <div>Loading...</div>
  }

  const users = query.data

  return (
    <table>
      <thead>
        <tr>
          <th>{}</th>
          <th>blogs created</th>
        </tr>
      </thead>
      <tbody>
        {users.map((u) => (
          <tr key={u.id}>
            <td>{u.name}</td>
            <td>{u.blogs.length}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default UserList
