export default function CountryInfo({country}) {
  return (
    <div>
      <h1>{country.name.common}</h1>
      <p>Capital: {country.capital[0]}</p>
      <p>Area: {country.area}</p>
      <h3>Languages</h3>
      <ul>
        {
          //languages is an object, not array
          Object.values(country.languages)
            .map(language => <li key={language}>{language}</li>)
        }
      </ul>
      <img style={{border: "2px solid black"}} src={country.flags.png} alt={country.flags.alt}/>
    </div>
  );
}