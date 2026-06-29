import { useAnecdoteFilter, useAnecdotesActions } from '../stores/AnecdotesStore';

export default function AnecdoteFilter() {
  const filter = useAnecdoteFilter();
  const { setFilter } = useAnecdotesActions();

  return (
    <input value={filter} onChange={({ target }) => setFilter(target.value)} />
  );
}
