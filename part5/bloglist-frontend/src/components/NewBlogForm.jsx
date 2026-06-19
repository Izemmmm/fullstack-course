import {useState} from "react";

export default function NewBlogForm({onSubmit}) {
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
      <h2>create new blog</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            title:
            <input value={title} onChange={({target}) => setTitle(target.value)} />
          </label>
        </div>
        <div>
          <label>
            author:
            <input value={author} onChange={({target}) => setAuthor(target.value)} />
          </label>
        </div>
        <div>
          <label>
            url:
            <input value={url} onChange={({target}) => setUrl(target.value)} />
          </label>
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  );
}