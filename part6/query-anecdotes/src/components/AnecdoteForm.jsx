import useNotification from '../hooks/useNotification';
import { useAnecdotes } from '../queries/AnecdotesQuery';

const AnecdoteForm = () => {
  const { newAnecdoteMutation } = useAnecdotes();
  const { showNotification } = useNotification();

  const onCreate = async(event) => {
    event.preventDefault();
    const content = event.target.anecdote.value;
    try {
      await newAnecdoteMutation.mutateAsync({ content, votes: 0 });
      showNotification(`new anecdote is created: ${event.target.anecdote.value}`, 4000);
    } catch (error) {
      // showNotification(error.message, 4000);
    }
    event.target.reset();
    console.log('new anecdote');
  };

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name="anecdote" />
        <button type="submit">create</button>
      </form>
    </div>
  );
};

export default AnecdoteForm;
