export const initialBlogs = [
  {
    title: 'Getting Started with Node.js',
    author: 'Ilya Volkov',
    url: 'https://example.com/nodejs-intro',
    likes: 42,
  },
  {
    title: 'Understanding Express Middleware',
    author: 'Max Petrov',
    url: 'https://example.com/express-middleware',
    likes: 87,
  },
  {
    title: 'MongoDB Basics for Beginners',
    author: 'Anna Novak',
    url: 'https://example.com/mongodb-basics',
    likes: 65
  },
  {
    title: 'Modern JavaScript Features',
    author: 'Ilya Volkov',
    url: 'https://example.com/js-modern',
    likes: 120
  },
  {
    title: 'Building REST APIs with Express',
    author: 'Sarah Johnson',
    url: 'https://example.com/rest-api-express',
    likes: 98
  }
];

export const newBlog = {
  title: 'New blog for the list',
  author: 'Iluha Volk',
  url: 'https://example.com/nodejs-intro',
  likes: 777
};

export const updateLikesBlog ={
  likes: 1000
};

export const updateAllBlog ={
  title: 'New blog for the list',
  author: 'Iluha Volk',
  url: 'https://example.com/nodejs-intro',
  likes: 1234
};

export const noLikesBlog = {
  title: 'I will never get a like',
  author: 'Looser',
  url: 'https://example.com/nodejs-intro'
};

export const noTitleBlog = {
  author: 'Iluha Volk',
  url: 'https://example.com/nodejs-intro',
  likes: 777
};

export const noUrlBlog = {
  title: 'No url here :(',
  author: 'Iluha Volk',
  likes: 777
};

export const url = '/api/blogs';