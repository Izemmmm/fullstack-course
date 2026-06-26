import { Button, TextField, Typography } from '@mui/material';
import { useState } from 'react';

export default function LoginForm({ onSubmit }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(username, password);
  };

  return (
    <div>
      <Typography variant='h5'>log in to bloglist</Typography>
      <form onSubmit={handleSubmit}>
        <div>
          <TextField label="username" variant='standard' value={username} onChange={event => setUsername(event.target.value)}/>
        </div>
        <div>
          <TextField label="password" variant='standard' type="password" value={password} onChange={event => setPassword(event.target.value)} />
        </div>
        <div>
          <Button type="submit" variant='contained'>log in</Button>
        </div>
      </form>
    </div>
  );
}
