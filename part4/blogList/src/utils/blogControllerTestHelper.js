export const initialUsers = [
  {
    _id: '6a2a76169829b749b551c5eb',
    username: 'coolguy123',
    name: 'ilya volkov',
    passwordHash: '123abc',
    blogs: []
  },
  {
    _id: '6a2a75f5a5284ea417454884',
    username: 'oxotnik51',
    name: 'vova dum',
    passwordHash: '123456789',
    blogs: []
  }
];

export const expectedInitialUsers = [
  {
    id: '6a2a76169829b749b551c5eb',
    username: 'coolguy123',
    name: 'ilya volkov',
    blogs: []
  },
  {
    id: '6a2a75f5a5284ea417454884',
    username: 'oxotnik51',
    name: 'vova dum',
    blogs: []
  }
];

export const initialBlogs = [
  {
    _id: '1a2a76169829b749b551c5eb',
    title: 'Getting Started with Node.js',
    author: 'Ilya Volkov',
    user: initialUsers[0]._id,
    url: 'https://example.com/nodejs-intro',
    likes: 42,
  },
  {
    _id: '2a2a76169829b749b551c5eb',
    title: 'Understanding Express Middleware',
    author: 'Max Petrov',
    user: initialUsers[0]._id,
    url: 'https://example.com/express-middleware',
    likes: 87,
  },
  {
    _id: '3a2a76169829b749b551c5eb',
    title: 'MongoDB Basics for Beginners',
    author: 'Anna Novak',
    user: initialUsers[0]._id,
    url: 'https://example.com/mongodb-basics',
    likes: 65
  },
  {
    _id: '4a2a76169829b749b551c5eb',
    title: 'Modern JavaScript Features',
    author: 'Ilya Volkov',
    user: initialUsers[0]._id,
    url: 'https://example.com/js-modern',
    likes: 120
  },
  {
    _id: '5a2a76169829b749b551c5eb',
    title: 'Building REST APIs with Express',
    author: 'Sarah Johnson',
    user: initialUsers[0]._id,
    url: 'https://example.com/rest-api-express',
    likes: 98
  }
];

export function getExpectedBlog(blog, id, isPopulated = false) {
  const {_id, userId, ...expectedBlog} = blog;
  expectedBlog.id = id ?? _id;
  if (isPopulated) {
    expectedBlog.user = expectedInitialUsers[0];
    expectedBlog.user.blogs = [expectedBlog.id];
  } else {
    expectedBlog.user =expectedInitialUsers[0].id;
  }

  return expectedBlog;
}

export const newBlog = {
  title: 'New blog for the list',
  author: 'Iluha Volk',
  userId: '6a2a76169829b749b551c5eb',
  url: 'https://example.com/nodejs-intro',
  likes: 777
};

export const updateAllBlog ={
  title: 'Updated blog',
  author: 'Vova dub',
  userId: '6a2a76169829b749b551c5eb',
  url: 'https://google.com',
  likes: 1234
};

export const url = '/api/blogs';