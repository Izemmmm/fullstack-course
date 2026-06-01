import axios from 'axios';

const apiUrl = "https://studies.cs.helsinki.fi/restcountries/api";

function getAll() {
  const request = axios.get(`${apiUrl}/all`);
  return request.then(response => response.data);
}

function getByName(name) {
  const request = axios.get(`${apiUrl}/name/${name}`);
  return request.then(response => response.data);
}

export default {getAll, getByName};