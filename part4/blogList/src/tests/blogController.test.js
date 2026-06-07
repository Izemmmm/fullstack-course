import supertest from 'supertest';
import {test, describe, beforeEach, after} from 'node:test';
import Blog from '../models/blog.js';
import app from '../app.js';
import mongoose from 'mongoose';

const api = supertest(app);

const initialBlogs = [
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

beforeEach(async () => {
  await Blog.deleteMany({});
  await Blog.insertMany(initialBlogs);
});

describe('blog controller', () => {
  test.only('get all blogs', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/);
  });

  after(async () => {
    await mongoose.connection.close();
  });
});