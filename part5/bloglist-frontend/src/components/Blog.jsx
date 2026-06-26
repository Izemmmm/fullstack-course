import { Box, Button, Card, Typography } from '@mui/material';

export default function Blog({ blog, userId, handleLike, handleDelete }) {
  if (!blog) {
    return null;
  }

  return (
    <Card sx={{ margin: 5, padding: 1 }}>
      <Typography variant="h5">
        {blog.title}
      </Typography>
      <Typography color="textSecondary">
        {`by ${blog.author}`}
      </Typography>
      <Box sx={{ height: 20 }}/>
      <Typography component="a" href={blog.url} >
        {`${blog.url}`}
      </Typography>
      <Typography color="textSecondary">
        {`Added by ${blog.user.name}`}
      </Typography>
      <Typography color="textSecondary">
        {`likes: ${blog.likes}`}
        <Button variant="contained" sx={{ ml: 1 }} onClick={() => handleLike(blog.id, blog.likes + 1)}>like</Button>
      </Typography>
      {(userId === blog.user.id) && <Button variant="contained" color="error" onClick={() => handleDelete(blog.id)}>remove</Button>}
    </Card>
  );
}
