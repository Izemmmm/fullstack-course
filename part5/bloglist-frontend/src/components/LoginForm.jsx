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
      <h2>log in to bloglist</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            username
            <input value={username} onChange={event => setUsername(event.target.value)}/>
          </label>
        </div>
        <div>
          <label>
            password
            <input type="password" value={password} onChange={event => setPassword(event.target.value)} />
          </label>
        </div>
        <div>
          <button type="submit">log in</button>
        </div>
      </form>
    </div>
  );
}
