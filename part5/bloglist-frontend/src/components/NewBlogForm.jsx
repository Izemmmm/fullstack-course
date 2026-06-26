import { Button, TextField, Typography } from '@mui/material';
import { useState } from 'react';

export default function NewBlogForm({ onSubmit }) {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(title, author, url);
    setTitle('');
    setAuthor('');
    setUrl('');
  };

  return (
    <div>
      <Typography variant="h5">Create new blog</Typography>
      <form onSubmit={handleSubmit}>
        <div>
          <TextField label="title" value={title} onChange={({ target }) => setTitle(target.value)} />
        </div>
        <div>
          <TextField label="author" value={author} onChange={({ target }) => setAuthor(target.value)} />
        </div>
        <div>
          <TextField label="url" value={url} onChange={({ target }) => setUrl(target.value)} />
        </div>
        <Button type="submit" variant="contained" style={{ marginTop: 10 }}>create</Button>
      </form>
    </div>
  );
}
