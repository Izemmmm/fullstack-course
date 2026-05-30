import { useState } from "react";

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]);

  return (
    <div>
      <h2>Phonebook</h2>
      <NewPersonForm persons={persons} setPersons={setPersons} />
      <h2>Numbers</h2>
      <PhoneBook persons={persons} />
    </div>
  );
};

function NewPersonForm({persons, setPersons}) {
  const [newName, setNewName] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!newName) return;
    if (persons.some(person => person.name === newName)){
      alert(`${newName} is already in the phonebook`);
      return;
    }
    setPersons(persons.concat({name: newName}));
    setNewName('');
  };

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        name: <input onChange={handleNameChange} placeholder="Enter name..." value={newName} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
}

function PhoneBook({persons}) {
  return (
    <ul>
      {persons.map(person => <li key={person.name}>{person.name}</li>)}
    </ul>
  );
}

export default App;