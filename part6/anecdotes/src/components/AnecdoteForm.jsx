import { useState } from 'react';
import { useAnecdotesActions } from '../stores/AnecdotesStore';

export default function AnecdoteForm() {
  const [anecdote, setAnecdote] = useState('');
  const { add: addAnecdote } = useAnecdotesActions();

  const handleSubmit = (e) => {
    e.preventDefault();

    addAnecdote(anecdote);
    setAnecdote('');
  };

  return (
    <div>
      <h2>Create new</h2>
      <form onSubmit={handleSubmit}>
        <label>
          anecdote
          <input value={anecdote} onChange={(({ target }) => setAnecdote(target.value))}/>
        </label>
        <button type="submit">create</button>
      </form>
    </div>
  );
}
