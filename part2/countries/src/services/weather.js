import axios from 'axios';

const apiKey = import.meta.env.VITE_SOME_KEY;
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?";
const iconsUrl = "https://openweathermap.org/payload/api/media/file";
const defaultQuery = "&units=metric";

function getCountryWeather(country){
  console.log(apiKey);
  const [lattitude, longitude] = country.capitalInfo.latlng;
  console.log(`${apiUrl}lat=${lattitude}&lon=${longitude}${defaultQuery}&appid=${apiKey}`);
  const request = axios.get(`${apiUrl}lat=${lattitude}&lon=${longitude}${defaultQuery}&appid=${apiKey}`);
  return request.then(response => response.data);
}

function getIconUrl(iconId) {
  return `${iconsUrl}/${iconId}.png`;
}

export default {getCountryWeather, getIconUrl};