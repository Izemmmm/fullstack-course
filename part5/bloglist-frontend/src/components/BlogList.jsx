import { useState } from "react";
import Toggleable from "./Toggleable";

export default function BlogList({user, blogs, handleLike, handleSort, handleDelete}) {
  const [isSortAscending, setIsSortAscending] = useState(false);
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  };

  return (
    <div>
      <h2>Blogs</h2>
      <button onClick={() => {
        handleSort(isSortAscending);
        setIsSortAscending(!isSortAscending);
      }}>sort by likes</button>
      {blogs.map(blog => {
        return (
          <div key={blog.id} style={blogStyle}>
            {`${blog.title} by ${blog.author}`}
            <Toggleable expandButtonText='view' hideButtonText='hide'>
              <div>
                {`${blog.url}`}
              </div>
              <div>
                {`likes: ${blog.likes}`}
                <button onClick={() => handleLike(blog.id, blog.likes + 1)}>like</button>
              </div>
              <div>
                {`${blog.user?.name}`}
              </div>
            </Toggleable>
            {console.log(user.id, blog.user.id)}
            {user.id === blog.user.id &&<button onClick={() => handleDelete(blog.id)}>remove</button>}
          </div>
        );
      })}
    </div>
  );
}