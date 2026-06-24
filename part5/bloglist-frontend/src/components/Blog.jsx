export default function Blog({ blog, userId, handleLike, handleDelete }) {
  if (!blog) {
    return null;
  }

  return (
    <div key={blog.id}>
      <h2>
        {`${blog.author}: ${blog.title}`}
      </h2>
      <div>
        {`${blog.url}`}
      </div>
      <div>
        {`likes: ${blog.likes}`}
        <button onClick={() => handleLike(blog.id, blog.likes + 1)}>like</button>
      </div>
      <div>
        {`Added by ${blog.user.name}`}
      </div>
      {(userId === blog.user.id) && <button onClick={() => handleDelete(blog.id)}>remove</button>}
    </div>
  );
}
