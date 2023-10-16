import { useParams } from "react-router-dom"
import { useQueryClient } from "@tanstack/react-query"

const UserDetails = () => {
  const { id } = useParams()
  const client = useQueryClient()
  const users = client.getQueryData(["users"])
  const user = users.find((u) => u.id === id)
  return (
    <div>
      <h2> {user.name} </h2>
      <h3> added blogs </h3>
      <ul>
        {user.blogs.map((b) => (
          <li key={b.id}>{b.title}</li>
        ))}
      </ul>
    </div>
  )
}

export default UserDetails
