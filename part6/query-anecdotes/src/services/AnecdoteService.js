const baseUrl = 'http://localhost:3001/anecdotes';

export async function getAll() {
  const response = await fetch(baseUrl);

  if (!response.ok) {
    throw new Error(`Error while fetching all anecdotes: ${response.statusText}`);
  }

  return await response.json();
}

export async function create(newAnecdote) {
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(newAnecdote)
  };
  const response = await fetch(baseUrl, options);

  if (!response.ok) {
    throw new Error(`Error while creating new anecdote: ${response.statusText}`);
  }

  return await response.json();
}

export async function update(updatedAnecdote) {
  const options = {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(updatedAnecdote)
  };
  const response = await fetch(`${baseUrl}/${updatedAnecdote.id}`, options);

  if (!response.ok) {
    throw new Error(`Error while updating the anecdote: ${response.statusText}`);
  }

  return await response.json();
}
