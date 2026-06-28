import { useAnecdotes, useAnecdotesActions } from '../stores/AnecdotesStore';

export default function AnecdoteList() {
  const anecdotes = useAnecdotes();
  const { vote } = useAnecdotesActions();

  return (
    <div>
      <h1>Anecdotes</h1>
      {anecdotes.map(anecdote => (
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            {`has ${anecdote.votes} votes `}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  );
}
