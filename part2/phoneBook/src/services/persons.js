import axios from "axios";

const baseUrl = "http://localhost:3001/persons";

function getAll() {
  const request = axios.get(baseUrl);
  return request.then(response => response.data);
}

function getById(id) {
  const request = axios.get(`${baseUrl}/${id}`);
  return request.then(response => response.data);
}

function update(id, updatedPerson) {
  const request = axios.put(`${baseUrl}/${id}`, updatedPerson);
  return request.then(response => response.data);
}

function create(newPerson) {
  const request = axios.post(baseUrl, newPerson);
  return request.then(response => response.data);
}

export default {getAll, getById, update, create};