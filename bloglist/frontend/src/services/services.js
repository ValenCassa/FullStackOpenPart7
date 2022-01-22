import axios from 'axios';
const baseUrl = '/api/blogs'
const usersUrl = '/api/users'

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const create = async newBlog => {
  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.post(baseUrl, newBlog, config)
  return response.data
}

const deleteBlog = async id => {
  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.delete(`${baseUrl}/${id}`, config)
  return response.data
}

const update = async (id, newObj) => {
  const object = newObj
  const response = await axios.put(`${baseUrl}/${id}`, object)

  return response.data
}

const getUsers = async () => {
  const response = await axios.get(usersUrl)

  return response.data
}


export default { getAll, create, setToken, update, deleteBlog, getUsers }