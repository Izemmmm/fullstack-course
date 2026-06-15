import supertest from 'supertest';
import {test, describe, beforeEach} from 'node:test';
import Blog from '../models/blog.js';
import User from '../models/user.js';
import app from '../app.js';
import mongoose from 'mongoose';
import assert from 'node:assert';
import '../utils/dbTestHelper.js';
import * as helper from '../utils/blogControllerTestHelper.js';

const api = supertest(app);

beforeEach(async () => {
  await User.deleteMany({});
  await User.insertMany(helper.initialUsers);
  await Blog.deleteMany({});
  await Blog.insertMany(helper.initialBlogs);
});

describe('blog controller', () => {
  describe('getting blogs', () => {
    test('get all blogs', async () => {
      await api
        .get(helper.url)
        .expect(200)
        .expect('Content-Type', /application\/json/);
    });
    
    test('get blog by id', async () => {
      const expectedBlog = helper.getExpectedBlog(helper.initialBlogs[0]);
      //initial user doesn't have blogs assigned, because it's saved directly to DB
      expectedBlog.user.blogs = [];

      const responseById = await api
        .get(`${helper.url}/${expectedBlog.id}`)
        .expect(200, expectedBlog);
    });
    
    test('ids are not "_id"', async () => {
      const response = await api.get(helper.url);
      
      const keys = Object.keys(response.body[0]);
      assert(!keys.includes('_id') && keys.includes('id'))
    });
    
  });
  
  describe('blog creation', () => {
    test('sends created blog back', async () => {
      const response = await api
      .post(helper.url)
      .send(helper.newBlog)
      .expect(201);
      const createdBlog = response.body;
      
      const expectedBlog = helper.getExpectedBlog(helper.newBlog, createdBlog.id);
      //on PUT method, user is not populated
      expectedBlog.user = expectedBlog.user.id;
      assert.deepStrictEqual(createdBlog, expectedBlog);
    });
    
    test('new blog is created', async () => {
      const createdResponse = await api
      .post(helper.url)
      .send(helper.newBlog)
      .expect(201);
      const generatedId = createdResponse.body.id;
      
      const blogs = await Blog.find({});
      assert.strictEqual(blogs.length, helper.initialBlogs.length + 1);

      const response = await api.get(`${helper.url}/${generatedId}`);
      const createdBlog = response.body;

      const expectedBlog = helper.getExpectedBlog(createdBlog, generatedId);
      assert.deepStrictEqual(createdBlog, expectedBlog);
    });
  });

  describe('schema validation', () => {
    test('default likes set', async () => {
      const {likes, ...noLikesBlog} = helper.newBlog;
      const createdBlogResponse = await api
      .post(helper.url)
      .send(noLikesBlog)
      .expect(201);
      
      const generatedId = createdBlogResponse.body.id;
  
      const expectedBlog = helper.getExpectedBlog(noLikesBlog, generatedId);
      expectedBlog.likes = 0;
  
      await api
        .get(`${helper.url}/${generatedId}`)
        .expect(200, expectedBlog);
    });
  
    test('missing title handling', async () => {
      const {title, ...noTitleBlog} = helper.newBlog;
      await api
        .post(helper.url)
        .send(noTitleBlog)
        .expect(400);
    });
  
    test('missing url handling', async () => {
      const {url, ...noUrlBlog} = helper.newBlog;
      await api
        .post(helper.url)
        .send(noUrlBlog)
        .expect(400);
    });
  });  

  describe('updating blog', () => {
    test('update blog likes', async () => {
      const updateLikesBlog = helper.newBlog;
      const response = await api
        .post(helper.url)
        .send(helper.newBlog);

      const generatedId = response.body.id;
      const expectedBlogOnUpdate = helper.getExpectedBlog(helper.newBlog, generatedId);
      expectedBlogOnUpdate.likes = 1234;
      //on PUT method, user is not populated
      expectedBlogOnUpdate.user = expectedBlogOnUpdate.user.id;

      await api
        .put(`${helper.url}/${generatedId}`)
        .send({likes: 1234})
        .expect(200, expectedBlogOnUpdate);
      
      const expectedBlog = helper.getExpectedBlog(helper.newBlog, generatedId);
      expectedBlog.likes = 1234;

      await api
        .get(`${helper.url}/${generatedId}`)
        .expect(200, expectedBlog);
    });
      
    test('update whole blog', async () => {
      const response = await api
        .post(helper.url)
        .send(helper.newBlog);

      const generatedId = response.body.id;
      const expectedBlogOnUpdate = helper.getExpectedBlog(helper.updateAllBlog, generatedId);
      expectedBlogOnUpdate.user = expectedBlogOnUpdate.user.id;
      
      await api
        .put(`${helper.url}/${generatedId}`)
        .send(helper.updateAllBlog)
        .expect(200, expectedBlogOnUpdate);
      
      const expectedBlog = helper.getExpectedBlog(helper.updateAllBlog, generatedId);

      await api
        .get(`${helper.url}/${generatedId}`)
        .expect(200, expectedBlog);
    });
      
    test('update non-existing blog', async () => {
      await api
        .put(`${helper.url}/6a27ce9e3eb7f822ca8b2620`)
        .send(helper.updateAllBlog)
        .expect(404);
    });
  });

  describe('deletion', () => {
    test('existing blog deletion', async () => {
      const response = await api.get(helper.url);
      const idToDelete = response.body[0].id;

      await api
        .delete(`${helper.url}/${idToDelete}`)
        .expect(204);
      
      await api
        .get(`${helper.url}/${idToDelete}`)
        .expect(404);

      const blogs = await Blog.find({});
      assert.strictEqual(blogs.length, helper.initialBlogs.length - 1);
    });

    test('non-existing blog deletion', async () => {
      await api
        .delete(`${helper.url}/6a27ce9e3eb7f822ca8b2620`)
        .expect(204);

      const blogs = await Blog.find({});
      assert.strictEqual(blogs.length, helper.initialBlogs.length);
    });
  });
});