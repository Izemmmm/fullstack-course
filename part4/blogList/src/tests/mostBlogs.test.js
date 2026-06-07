import {describe, test} from 'node:test';
import assert from 'node:assert';
import {mostBlogs} from '../utils/list_helper.js';

describe('most blogs', () => {
  const blogs = [
    {
      _id: '665a1f1a1b2c3d4e5f6a0001',
      title: 'Getting Started with Node.js',
      author: 'Ilya Volkov',
      url: 'https://example.com/nodejs-intro',
      likes: 42,
      __v: 0,
    },
    {
      _id: '665a1f1a1b2c3d4e5f6a0002',
      title: 'Understanding Express Middleware',
      author: 'Max Petrov',
      url: 'https://example.com/express-middleware',
      likes: 87,
      __v: 0,
    },
    {
      _id: '665a1f1a1b2c3d4e5f6a0003',
      title: 'MongoDB Basics for Beginners',
      author: 'Anna Novak',
      url: 'https://example.com/mongodb-basics',
      likes: 65,
      __v: 0,
    },
    {
      _id: '665a1f1a1b2c3d4e5f6a0004',
      title: 'Modern JavaScript Features',
      author: 'Ilya Volkov',
      url: 'https://example.com/js-modern',
      likes: 120,
      __v: 0,
    },
    {
      _id: '665a1f1a1b2c3d4e5f6a0005',
      title: 'Building REST APIs with Express',
      author: 'Sarah Johnson',
      url: 'https://example.com/rest-api-express',
      likes: 98,
      __v: 0,
    },
    {
      _id: '665a1f1a1b2c3d4e5f6a0006',
      title: 'Async JavaScript Deep Dive',
      author: 'Max Petrov',
      url: 'https://example.com/async-js',
      likes: 77,
      __v: 0,
    },
    {
      _id: '665a1f1a1b2c3d4e5f6a0007',
      title: 'React Component Patterns',
      author: 'Anna Novak',
      url: 'https://example.com/react-patterns',
      likes: 134,
      __v: 0,
    },
    {
      _id: '665a1f1a1b2c3d4e5f6a0008',
      title: 'State Management in Node Apps',
      author: 'John Smith',
      url: 'https://example.com/state-node',
      likes: 56,
      __v: 0,
    },
    {
      _id: '665a1f1a1b2c3d4e5f6a0009',
      title: 'Debugging Express Applications',
      author: 'Sarah Johnson',
      url: 'https://example.com/debug-express',
      likes: 88,
      __v: 0,
    },
    {
      _id: '665a1f1a1b2c3d4e5f6a000A',
      title: 'Performance Optimization Basics',
      author: 'Ilya Volkov',
      url: 'https://example.com/perf-basics',
      likes: 101,
      __v: 0,
    },
  ];

  const mostBlogsAuthor = {
    author: 'Ilya Volkov',
    blogs: 3
  };

  const oneBlogList = [
    {
      _id: '665a1f1a1b2c3d4e5f6a0001',
      title: 'Getting Started with Node.js',
      author: 'Ilya Volkov',
      url: 'https://example.com/nodejs-intro',
      likes: 42,
      __v: 0,
    }
  ];

  const mostBlogsOneBlog = {
    author: 'Ilya Volkov',
    blogs: 1
  };

  test('with empty list', () => {
    assert.strictEqual(mostBlogs([]), null);
  });
  
  test('with one blog in list', () => {
    assert.deepStrictEqual(mostBlogs(oneBlogList), mostBlogsOneBlog);
  });

  test('with filled list', () => {
    assert.deepStrictEqual(mostBlogs(blogs), mostBlogsAuthor);
  });
});