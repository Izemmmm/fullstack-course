import { Button, Typography } from '@mui/material';
import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function BlogList({ blogs, handleSort }) {
  const [isSortAscending, setIsSortAscending] = useState(false);

  return (
    <div>
      <Typography variant='h5'>Blogs</Typography>
      <Button variant="contained" sx={{ mb: 2 }} onClick={() => {
        handleSort(isSortAscending);
        setIsSortAscending(!isSortAscending);
      }}>sort by likes
      </Button>
      {blogs.map(blog => {
        return (
          <div key={blog.id}>
            <Button component={Link} to={`/blogs/${blog.id}`}
              variant='outlined' sx={{ mb: 0.5 }}>
              {`${blog.title} by ${blog.author}`}
            </Button>
          </div>
        );
      })}
    </div>
  );
}
