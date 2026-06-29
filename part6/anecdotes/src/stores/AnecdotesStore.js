import { create } from 'zustand';
import * as anecdoteService from '../services/anecdotesService';

const useAnecdotesStore = create((set, get) => ({
  anecdotes: [],
  filter: '',
  actions: {
    initialize: async() => {
      const anecdotes = await anecdoteService.getAll();
      set(() => ({ anecdotes }));
    },
    add: async(newAnecdote) => {
      const anecdoteToAdd = {
        id: Math.floor(Math.random() * 1000000),
        content: newAnecdote,
        votes: 0
      };

      const createdAnecdote = await anecdoteService.add(anecdoteToAdd);
      set(state => ({ anecdotes: state.anecdotes.concat(createdAnecdote) }));
    },
    vote: async(id) => {
      const anecdotes = get().anecdotes;
      const anecdote = anecdotes.find(anecdote => anecdote.id === id);

      const updatedAnecdote = await anecdoteService.update(anecdote.id, { content: anecdote.content, votes: anecdote.votes + 1 });
      const updatedAnecdotes = anecdotes.map(anecdote => {
        if (anecdote.id !== id) {
          return anecdote;
        }

        return updatedAnecdote;
      });

      set(() => ({ anecdotes: updatedAnecdotes }));
    },
    remove: async(id) => {
      await anecdoteService.remove(id);
      set(state => ({ anecdotes: state.anecdotes.filter(anecdote => anecdote.id !== id) }));
    },
    setFilter: (newFilter) => set(() => ({ filter: newFilter }))
  }
}));

export const useAnecdotes = () => {
  const anecdotes = useAnecdotesStore(state => state.anecdotes);
  const filter = useAnecdotesStore(state => state.filter);

  if (!filter) {
    return anecdotes.toSorted((an1, an2) => an2.votes - an1.votes);
  }

  return anecdotes
    .filter(anecdote => anecdote.content.toLowerCase().includes(filter.toLowerCase()))
    .toSorted((an1, an2) => an2.votes - an1.votes);
};
export const useAnecdoteFilter = () => useAnecdotesStore(state => state.filter);
export const useAnecdotesActions = () => useAnecdotesStore(state => state.actions);
