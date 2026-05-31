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

function create(newPerson) {
  const request = axios.post(baseUrl, newPerson);
  return request.then(response => response.data);
}

function update(id, personToUpdate) {
  console.log('update', personToUpdate);
  const request = axios.put(`${baseUrl}/${id}`, personToUpdate);
  return request.then(response => {
    console.log('response', response.data);
    return response.data;
  });
}

function remove(id) {
  const request = axios.delete(`${baseUrl}/${id}`);
  return request.then(response => response.data);
}

export default {getAll, getById, update, create, remove};