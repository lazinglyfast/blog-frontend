import axios from "axios"

const baseUrl = `http://localhost:${import.meta.env.VITE_PORT}/api/blogs`

const list = async () => {
  const result = await axios.get(baseUrl)
  return result.data
}

const create = async (blog, user) => {
  const config = {
    headers: {
      authorization: user.token,
    },
  }
  const result = await axios.post(baseUrl, blog, config)
  return result.data
}

const update = async (blog) => {
  const result = await axios.put(baseUrl, blog)
  return result.data
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
