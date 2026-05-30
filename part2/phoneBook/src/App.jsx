import { useState } from "react";

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ]);

  return (
    <div>
      <h2>Phonebook</h2>
      <NewContactForm persons={persons} setPersons={setPersons} />
      <h2>Numbers</h2>
      <PhoneBook persons={persons} />
    </div>
  );
};

function Filter({filter, setFilter}) {

  const handleFilterChange = (event) => {
    setFilter(event.target.value);

  };

  return (
    <input placeholder="search..." onChange={handleFilterChange} value={filter} />
  );
}

function NewContactForm({persons, setPersons}) {
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!newName || !newNumber) return;
    if (persons.some(person => person.name === newName)){
      alert(`${newName} is already in the phonebook`);
      return;
    }
    if (newNumber[newNumber.length - 1] === '-'){
      alert('Wrong number format!');
      return;
    }

    setPersons(persons.concat({name: newName, number: newNumber, id: persons.length + 1}));
    setNewName('');
    setNewNumber('');
  };

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    if (event.target.value && !/(^\+?\d+(\-\d*)*$)|(^\+$)/.test(event.target.value)) return;
    if (/--+/.test(event.target.value)) return;
    setNewNumber(event.target.value);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        name: <input onChange={handleNameChange} placeholder="Enter name..." value={newName} />
      </div>
      <div>
        number: <input onChange={handleNumberChange} placeholder="Enter number..." value={newNumber} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
}

function PhoneBook({persons}) {
  const [filter, setFilter] = useState('');
  
  return (
    <>
      <Filter filter={filter} setFilter={setFilter} />
      <ul>
        {persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()) || person.number.includes(filter))
                .map(person => <li key={person.id}>{person.name} {person.number}</li>)
        }
      </ul>
    </>
  );
}

export default App;