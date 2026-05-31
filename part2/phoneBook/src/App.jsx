import { useState, useEffect } from "react";
import axios from 'axios';
import Filter from "./components/Filter";
import NewContactForm from "./components/NewContactForm";
import PhoneBook from "./components/PhoneBook";

const App = () => {
  const [persons, setPersons] = useState([]);
  const personsUrl = 'http://localhost:3001/persons';

  const [filter, setFilter] = useState('');
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');

  useEffect(() => {
    axios
      .get(personsUrl)
      .catch(() => alert("Something went wrong :("))
      .then(response => setPersons(response.data));
  }, []);
  
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
      <NewContactForm newName={newName} newNumber={newNumber}
      onSubmit={handleNewContactSubmit}
      onNameChange={handleNameChange}
      onNumberChange={handleNumberChange} />
      <h2>Numbers</h2>
      <PhoneBook persons={persons} filter={filter} />
    </div>
  );
};

export default App;