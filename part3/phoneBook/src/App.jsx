import { useState, useEffect } from "react";
import personsService from "./services/persons";
import Filter from "./components/Filter";
import NewContactForm from "./components/NewContactForm";
import PhoneBook from "./components/PhoneBook";
import InfoBar from "./components/InfoBar";

const App = () => {
  const [persons, setPersons] = useState([]);

  const [filter, setFilter] = useState('');
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [infoMessage, setInfoMessage] = useState(null);

  const getAllContacts = () => {
    personsService
      .getAll()
      .then(data => {
        console.log(data);
        return setPersons(data);
      })
      .catch(() => alert("Something went wrong :("));
  };
  useEffect(getAllContacts, []);

  const addNewContact = (newPerson) => {
    return personsService
      .create(newPerson)
      .then(addedPerson => {
        setPersons(persons.concat(addedPerson));
        displayMessage(`New contact added: ${newName} ${newNumber}`);
      })
      .catch(e => displayMessage(e.response.data.error, true));
  };

  const updateContact = (id, personToUpdate) => {
    personsService
      .update(id, personToUpdate)
      .then(updatedPerson => {
        setPersons(persons.map(person => person.id === id ? updatedPerson : person))
      })
      .catch(() => alert("Couldn't update person"));
  };

  const deleteContact = (id) => {
    personsService
      .remove(id)
      .then(() => setPersons(persons.filter(person => person.id !== id)))
      .catch(() => {
        displayMessage("Can't delete this contact", true);
        getAllContacts();
      });
  };
  
  const handleNewContactSubmit = (event) => {
    event.preventDefault();

    if (!newName || !newNumber) return;
    if (newNumber[newNumber.length - 1] === '-'){
      alert('Wrong number format!');
      return;
    }
    
    if (persons.some(person => person.name === newName)){
      const existingId = persons.find(person => person.name === newName).id;
      const confirmation = window.confirm(`Replace number for ${newName}?`);
      if (confirmation) {
        updateContact(existingId, {name: newName, number: newNumber});
        displayMessage(`Number for ${newName} was changed to ${newNumber}`);
        setNewName('');
        setNewNumber('');
      }
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
    const name = persons.find(person => person.id === id).name;
    const confirmation = window.confirm(`Delete ${name}?`);
    if (!confirmation) return;

    deleteContact(id);
  };

  const displayMessage = (text, isCritical = false) => {
    setInfoMessage({text, isCritical});
    setTimeout(() => setInfoMessage(null), 3000);
  };

  return (
    <div>
      <InfoBar message={infoMessage} />
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