import { useState, useEffect } from "react";
import personsService from "./services/persons";
import Filter from "./components/Filter";
import NewContactForm from "./components/NewContactForm";
import PhoneBook from "./components/PhoneBook";

const App = () => {
  const [persons, setPersons] = useState([]);

  const [filter, setFilter] = useState('');
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');

  const getInitialContacts = () => {
    personsService
      .getAll()
      .catch(() => alert("Something went wrong :("))
      .then(data => setPersons(data));
  };
  useEffect(getInitialContacts, []);

  const addNewContact = (newPerson) => {
    personsService
      .create(newPerson)
      .then(addedPerson => setPersons(persons.concat(addedPerson)))
      .catch(e => alert(e));
  };

  const deleteContact = (id) => {
    personsService
      .remove(id)
      .then(setPersons(persons.filter(person => person.id !== id)))
      .catch(() => alert("Can't delete this contact"));
  };
  
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

    addNewContact({name: newName, number: newNumber});

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

  const handleDeleteClick = (id) => {
    deleteContact(id);
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
      <PhoneBook persons={persons} filter={filter} onDeleteClick={handleDeleteClick} />
    </div>
  );
};

export default App;