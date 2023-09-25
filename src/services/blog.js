import axios from "axios"

const baseUrl = `http://localhost:${import.meta.env.VITE_PORT}/api/blogs`

const list = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const create = async (blog, user) => {
  const config = {
    headers: {
      authorization: user.token,
    },
  }
  const response = await axios.post(baseUrl, blog, config)
  return response.data
}

const update = async (blog) => {
  const response = await axios.put(baseUrl, blog)
  return response.data
}

const remove = async (blog, user) => {
  const config = {
    headers: {
      authorization: user.token,
    },
  }
  await axios.delete(`${baseUrl}/${blog.id}`, config)
}

export default {
  list,
  create,
  update,
  remove,
}
