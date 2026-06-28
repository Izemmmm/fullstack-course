import { create } from 'zustand';

const initiAnecdotes = [
  'If it hurts, do it more often.',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
  'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
  'The only way to go fast, is to go well.'
];

const formattedAnecdotes = initiAnecdotes.map((anecdote) => ({
  id: Math.floor(Math.random() * 1000000),
  content: anecdote,
  votes: 0
}));

const useAnecdotesStore = create(set => ({
  anecdotes: formattedAnecdotes,
  actions: {
    add: (newAnecdote) => set(state => {
      const anecdoteToAdd = {
        id: Math.floor(Math.random() * 1000000),
        content: newAnecdote,
        votes: 0
      };

      return { anecdotes: state.anecdotes.concat(anecdoteToAdd) };
    }),
    vote: (id) => set(state => {
      const updatedAnecdotes = state.anecdotes.map(anecdote => {
        if (anecdote.id !== id) {
          return anecdote;
        }

        const votedAnecdote = {
          ...anecdote,
          votes: anecdote.votes + 1
        };
        return votedAnecdote;
      });

      const sortedAnecdotes = updatedAnecdotes.toSorted((an1, an2) => an2.votes - an1.votes);

      return { anecdotes: sortedAnecdotes };
    })
  }
}));

export const useAnecdotes = () => useAnecdotesStore(state => state.anecdotes);
export const useAnecdotesActions = () => useAnecdotesStore(state => state.actions);
