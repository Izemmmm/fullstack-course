
export default function BlogList({blogs}) {
  return (
    <div>
      <h2>Blogs</h2>
      {blogs.map(blog => {
        return (
          <div key={blog.id}>
            {`${blog.title} by ${blog.author}`}
          </div>
        );
      })}
    </div>
  );
}