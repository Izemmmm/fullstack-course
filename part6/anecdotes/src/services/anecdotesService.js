const baseUrl = 'http://localhost:3001/anecdotes';

export async function getAll() {
  const response = await fetch(baseUrl);
  if (!response.ok) {
    throw new Error('Cannot fetch anecdotes');
  }

  return await response.json();
}

export async function add(newAnecdote) {
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(newAnecdote)
  };

  const response = await fetch(baseUrl, options);
  if (!response.ok) {
    throw new Error('Cannot create anecdote', newAnecdote);
  }

  return await response.json();
}

export async function update(id, updateBody) {
  const options = {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(updateBody)
  };

  const response = await fetch(`${baseUrl}/${id}`, options);
  if (!response.ok) {
    throw new Error('Cannot update anecdote', updateBody);
  }

  return await response.json();
}

export async function remove(id) {
  const options = {
    method: 'DELETE'
  };

  const response = await fetch(`${baseUrl}/${id}`, options);
  if (!response.ok) {
    throw new Error('Cannot delete anecdote', id);
  }
}
