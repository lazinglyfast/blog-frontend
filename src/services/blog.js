import axios from "axios"

const baseUrl = `http://localhost:${import.meta.env.VITE_PORT}/api/blogs`

const list = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

export default { list }
