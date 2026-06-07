import lodash from 'lodash';

export function dummy(blogs) {
  return 1;
}

export function totalLikes(blogs) {
  return blogs.reduce((likes, current) => {
    return likes + current.likes;
  }, 0);
}

export function favoriteBlog(blogs) {
  if (!blogs.length) {
    return null;
  }
  return blogs.reduce((favoriteBlog, currBlog) => {
    if (currBlog.likes > favoriteBlog.likes) {
      return currBlog;
    }

    return favoriteBlog;
  }, blogs[0]);
}

export function mostBlogs(blogs) {
  if (!blogs.length) {
    return null;
  }
  const blogsByAuthor = lodash.groupBy(blogs, (blog) => blog.author);
  const mostBlogsAuthor = Object.entries(blogsByAuthor).reduce((bestAuthor, entry) => {
    const authorBlogs = entry[1];
    if (authorBlogs.length > bestAuthor.blogs) {
      return {author: authorBlogs[0].author, blogs: authorBlogs.length};
    }
    return bestAuthor;
  }, {blogs: -Infinity});

  return mostBlogsAuthor;
}