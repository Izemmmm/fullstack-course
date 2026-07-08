import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import * as anecdoteService from '../services/AnecdoteService.js';
import useNotification from '../hooks/useNotification.js';

export function useAnecdotes() {
  const queryClient = useQueryClient();
  const { showNotification } = useNotification();

  const result = useQuery({ queryKey: ['anecdotes'], queryFn: anecdoteService.getAll });

  const newAnecdoteMutation = useMutation({
    mutationFn: anecdoteService.create,
    onSuccess: (createdAnecdote) => {
      const oldAnecdotes = queryClient.getQueryData(['anecdotes']);
      queryClient.setQueryData(['anecdotes'], oldAnecdotes.concat(createdAnecdote));
    },
    onError: () => {
      showNotification('Too short anecdote, at least 5 characters required', 4000);
    }
  });

  const updateAnecdoteMutation = useMutation({
    mutationFn: anecdoteService.update,
    onSuccess: (updatedAnecdote) => {
      const anecdotes = queryClient.getQueryData(['anecdotes']);
      queryClient.setQueryData(['anecdotes'],
        anecdotes.map(anecdote => anecdote.id === updatedAnecdote.id ? updatedAnecdote : anecdote));
    }
  });

  return {
    anecdotes: result.data,
    isPending: result.isPending,
    error: result.error,
    newAnecdoteMutation,
    updateAnecdoteMutation
  };
}
