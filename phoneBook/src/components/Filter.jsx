export default function Filter({filter, onFilterChange}) {
  return (
    <input placeholder="search..." onChange={onFilterChange} value={filter} />
  );
}