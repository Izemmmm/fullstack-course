import { useState, useEffect } from 'react';
import countriesService from './services/countries';
import weatherService from './services/weather';
import Notification from './components/Notification';
import Search from './components/Search';
import CountryList from './components/CountryList';
import CountryInfo from './components/CountryInfo';

function App() {
  const [notificationMessage, setNotificationMessage] = useState('');
  const [isError, setIsError] = useState(false);
  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [search, setSearch] = useState('');
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [weather, setWeather] = useState(null);

  const displayMessage = (message, isError = false) => {
    setNotificationMessage(message);
    setIsError(isError);
    setTimeout(() => setNotificationMessage(''), 3000);
  };

  useEffect(() => {
    countriesService
      .getAll()
      .then(countries => setCountries(countries))
      .catch(e => displayMessage("Can't get countries data!", true));
  }, []);

  useEffect(() => {
    const filtered = countries.filter(country => {
      const name = country.name.common;
      return name.toLowerCase().includes(search.toLowerCase());
    });

    if (filtered.length === 1) {
      setSelectedCountry(filtered[0]);
    }
    else {
      setSelectedCountry(null);
    }

    setFilteredCountries(filtered);
  }, [search]);

  useEffect(() => {
    if (!selectedCountry) return;

    weatherService
      .getCountryWeather(selectedCountry)
      .then(weather => {
        setWeather({temp: weather.main.temp, wind: weather.wind.speed, image: weatherService.getIconUrl(weather.weather[0].icon)});
      })
      .catch(e => displayMessage("Can't load the weather", true));
  }, [selectedCountry]);

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
  };

  const handleSelectSuggestion = (country) => {
    setSelectedCountry(country);
  };

  return (
    <div>
      <Notification message={notificationMessage} isError={isError}></Notification>
      <Search onSearch={handleSearchChange} value={search} />
      {filteredCountries.length !== 1 && <CountryList countries={filteredCountries} onSelectSuggestion={handleSelectSuggestion} />}
      {selectedCountry && <CountryInfo country={selectedCountry} weather={weather} />}
    </div>
  )
}

export default App;