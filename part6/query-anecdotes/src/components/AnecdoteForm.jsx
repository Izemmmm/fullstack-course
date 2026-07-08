import { useAnecdotes } from '../queries/AnecdotesQuery';

const AnecdoteForm = () => {
  const { newAnecdoteMutation } = useAnecdotes();

  const onCreate = async(event) => {
    event.preventDefault();
    const content = event.target.anecdote.value;
    newAnecdoteMutation.mutate({ content, votes: 0 });
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
