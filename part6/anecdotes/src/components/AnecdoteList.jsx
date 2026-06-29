import { useAnecdotes, useAnecdotesActions } from '../stores/AnecdotesStore';
import { useShowNotification } from '../stores/NotificationStore';

export default function AnecdoteList() {
  const anecdotes = useAnecdotes();
  const { vote, remove } = useAnecdotesActions();
  const showNotification = useShowNotification();

  const handleVote = async(id, content) => {
    await vote(id);
    console.log(showNotification);
    showNotification(`${content} gains vote`);
  };

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
            <button onClick={() => handleVote(anecdote.id, anecdote.content)}>vote</button>
            {anecdote.votes === 0 && <button onClick={() => remove(anecdote.id)}>X</button>}
          </div>
        </div>
      ))}
    </div>
  );
}
