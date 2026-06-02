export default function NewContactForm({onSubmit, newName, newNumber, onNameChange, onNumberChange}) {
  return (
    <form onSubmit={onSubmit}>
      <h2>Add new contact</h2>
      <div>
        name: <input onChange={onNameChange} placeholder="Enter name..." value={newName} />
      </div>
      <div>
        number: <input onChange={onNumberChange} placeholder="Enter number..." value={newNumber} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
}