export default function Search({onSearch, value}) {
  return (
    <div>
      find countries 
      <input style={{marginLeft: 5}} onChange={onSearch} placeholder="Search..." value={value} />
    </div>
  );
}