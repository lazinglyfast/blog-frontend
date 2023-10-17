import axios from "axios"

const baseUrl = `http://localhost:${import.meta.env.VITE_PORT}/api/comments`

const list = async () => {
  const result = await axios.get(baseUrl)
  return result.data
}

const create = async (comment) => {
  const result = await axios.post(baseUrl, comment)
  return result.data
}

export default {
  list,
  create,
}
