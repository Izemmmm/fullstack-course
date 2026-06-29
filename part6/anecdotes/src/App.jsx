import AnecdoteList from './components/AnecdoteList';
import AnecdoteForm from './components/AnecdoteForm';
import AnecdoteFilter from './components/AnecdoteFilter';
import { useAnecdotesActions } from './stores/AnecdotesStore';
import { useEffect } from 'react';
import Notification from './components/Notification';

const App = () => {
  const { initialize } = useAnecdotesActions();

  useEffect(() => {
    initialize();
  }, [initialize]);

  return (
    <div>
      <Notification />
      <AnecdoteFilter />
      <AnecdoteList />
      <AnecdoteForm />
    </div>
  );
};

export default App;
