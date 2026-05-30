import { useState } from "react";
import Filter from "./components/Filter";
import NewContactForm from "./components/NewContactForm";
import PhoneBook from "./components/PhoneBook";

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ]);
  const [filter, setFilter] = useState('');
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  
  const handleNewContactSubmit = (event) => {
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

  const handleFilterChange = (event) => {
    setFilter(event.target.value);

  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={filter} onFilterChange={handleFilterChange} />
      <NewContactForm onSubmit={handleNewContactSubmit}
      newName={newName}
      newNumber={newNumber}
      onNameChange={handleNameChange}
      onNumberChange={handleNumberChange} />
      <h2>Numbers</h2>
      <PhoneBook persons={persons} filter={filter} />
    </div>
  );
};

export default App;