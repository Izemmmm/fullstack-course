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
          <div>
            <button key={country.name.common} onClick={() => onSelectSuggestion(country.name.common)}>{country.name.common}</button>
          </div>
        );
      })}
    </>
  );
}