import {describe, test} from 'node:test';
import assert from 'node:assert';
import {totalLikes} from '../utils/list_helper.js';

describe('total likes', () => {
  const oneBlogList = [
    {
      _id: '665a1f1a1b2c3d4e5f6a0001',
      title: 'Getting Started with Node.js',
      author: 'Ilya Volkov',
      url: 'https://example.com/nodejs-intro',
      likes: 100,
      __v: 0,
    }
  ];
  
  const filledList = [
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
      author: 'John Smith',
      url: 'https://example.com/modern-javascript',
      likes: 123,
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
  ];
  
  test('with empty list', () => {
    assert.strictEqual(totalLikes([]), 0);
  });
  
  test('with list containing only one blog', () => {
    assert.strictEqual(totalLikes(oneBlogList), 100);
  });

  test('with filled list', () => {
    assert.strictEqual(totalLikes(filledList), 415);
  });
});