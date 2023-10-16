import axios from "axios"

const baseUrl = `http://localhost:${import.meta.env.VITE_PORT}/api/users`

const list = async () => {
  const result = await axios.get(baseUrl)
  return result.data
}

export default {
  list,
}
