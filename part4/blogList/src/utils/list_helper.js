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

  const blogsByAuthor = lodash.countBy(blogs, 'author');
  const mostBlogsAuthor = Object.entries(blogsByAuthor).reduce((bestAuthor, entry) => {
    if (entry[1] > bestAuthor.blogs) {
      return {author: entry[0], blogs: entry[1]};
    }
    return bestAuthor;
  }, {blogs: -Infinity});

  return mostBlogsAuthor;
}

export function mostLikes(blogs) {
  if (!blogs.length) {
    return null;
  }

  const bloggersLikes = blogs.reduce((acc, blog) => {
    if (!acc[blog.author]) {
      acc[blog.author] = 0;
    }
    acc[blog.author] += blog.likes;
    return acc;
  }, {});

  const topBlogger = Object.entries(bloggersLikes).reduce((bestAuthor, entry) => {
    if (entry[1] > bestAuthor.likes) {
      return {author: entry[0], likes: entry[1]};
    }
    return bestAuthor;
  }, {likes: -Infinity});

  return topBlogger;
}