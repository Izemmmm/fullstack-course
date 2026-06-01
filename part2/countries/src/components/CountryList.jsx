export default function CountryList({countries, onSelectSuggestion}) {
  if (!countries.length) {
    return <div>No matches</div>;
  }

  if (countries.length > 10) {
    return <div>Too many matches</div>;
  }

  return (
    <>
      {countries.map(country => {
        return (
          <div key={country.name.common}>
            {country.name.common}
            <button onClick={() => onSelectSuggestion(country)}>Show</button>
          </div>
        );
      })}
    </>
  );
}