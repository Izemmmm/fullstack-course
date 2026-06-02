export default function PhoneBook({persons, filter, onDeleteClick}) {
  return (
    <ul>
      {persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()) || person.number.includes(filter))
              .map(person => {
              return (
                <li key={person.id}>
                  {person.name} {person.number}
                  <button onClick={() => onDeleteClick(person.id)}>delete</button>
                </li>
              );
            })
      }
    </ul>
  );
}