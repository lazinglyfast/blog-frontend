import axios from "axios"

const baseUrl = `http://localhost:${import.meta.env.VITE_PORT}/api/login`

const login = async (credentials) => {
  const response = await axios.post(baseUrl, credentials)
  return response.data
}

export default { login }
