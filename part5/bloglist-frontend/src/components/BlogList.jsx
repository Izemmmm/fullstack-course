import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function BlogList({ blogs, handleSort }) {
  const [isSortAscending, setIsSortAscending] = useState(false);

  return (
    <div>
      <h2>Blogs</h2>
      <button onClick={() => {
        handleSort(isSortAscending);
        setIsSortAscending(!isSortAscending);
      }}>sort by likes
      </button>
      {blogs.map(blog => {
        return (
          <div key={blog.id}>
            <Link to={`/blogs/${blog.id}`}>
              {`${blog.title} by ${blog.author}`}
            </Link>
          </div>
        );
      })}
    </div>
  );
}
