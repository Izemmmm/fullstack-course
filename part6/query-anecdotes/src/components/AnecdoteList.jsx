import useNotification from '../hooks/useNotification';
import { useAnecdotes } from '../queries/AnecdotesQuery';

export default function AnecdoteList() {
  const { anecdotes, isPending, updateAnecdoteMutation } = useAnecdotes();
  const { showNotification } = useNotification();

  if (isPending) return <div>Loading anecdotes...</div>;
  else if (!anecdotes) return null;

  const handleVote = async(anecdote) => {
    await updateAnecdoteMutation.mutateAsync({ ...anecdote, votes: anecdote.votes + 1 });
    showNotification(`"${anecdote.content}" is voted`, 4000);
  };

  return (
    <div>
      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  );
}
