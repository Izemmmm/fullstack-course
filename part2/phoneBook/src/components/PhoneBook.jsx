export default function PhoneBook({persons, filter}) {
  return (
    <ul>
      {persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()) || person.number.includes(filter))
              .map(person => <li key={person.id}>{person.name} {person.number}</li>)
      }
    </ul>
  );
}