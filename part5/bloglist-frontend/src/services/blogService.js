import axios from 'axios';

const baseUrl = '/api/blogs';

let token = null;
function setToken(newToken) {
  token = newToken;
}

async function getAll() {
  const response = await axios.get(baseUrl);
  return response.data;
}

async function getById(id) {
  const response = await axios.get(`${baseUrl}/${id}`);
  return response.data;
}

async function create(blog) {
  const response = await axios.post(baseUrl, blog, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return response.data;
}

async function update(id, updateData) {
  const response = await axios.put(`${baseUrl}/${id}`, updateData);
  return response.data;
}

async function remove(id) {
  const response = await axios.delete(`${baseUrl}/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return response.data;
}

export default { setToken, getAll, getById, create, update, remove };
