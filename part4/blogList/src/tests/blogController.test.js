import supertest from 'supertest';
import {test, describe, beforeEach} from 'node:test';
import Blog from '../models/blog.js';
import app from '../app.js';
import mongoose from 'mongoose';
import assert from 'node:assert';
import '../utils/dbTestHelper.js';
import * as helper from '../utils/blogControllerTestHelper.js';

const api = supertest(app);

beforeEach(async () => {
  await Blog.deleteMany({});
  await Blog.insertMany(helper.initialBlogs);
});

describe('blog controller', () => {
  test('wrong endpoint handling', async () => {
    await api
      .get('/api/wrong')
      .expect(404);
  });

  describe('getting blogs', () => {
    test('get all blogs', async () => {
      await api
        .get(helper.url)
        .expect(200)
        .expect('Content-Type', /application\/json/);
    });
    
    test('get blog by id', async () => {
      const response = await api.get(helper.url)
      const blog = response.body[0];
  
      const responseById = await api
        .get(`${helper.url}/${blog.id}`)
        .expect(200, blog);
    });
  
    test('ids are not "_id"', async () => {
      const response = await api.get(helper.url);
  
      const keys = Object.keys(response.body[0]);
      assert(!keys.includes('_id') && keys.includes('id'))
    });
    
  });

  describe('blog creation', () => {
    test('sends created blog back', async () => {
      const response = await api.post(helper.url).send(helper.newBlog);
      const {id, ...createdBlog} = response.body;
  
      assert.deepStrictEqual(createdBlog, helper.newBlog);
    });
  
    test('new blog is created', async () => {
      const createdBlogResponse = await api
        .post(helper.url)
        .send(helper.newBlog)
        .expect(201);
      const generatedId = createdBlogResponse.body.id;
  
      const response = await api.get(helper.url);
      const newBlogs = response.body;
      assert.strictEqual(newBlogs.length, helper.initialBlogs.length + 1);
  
      const {id, ...createdBlog} = newBlogs.find(blog => blog.id === generatedId);
      assert.deepStrictEqual(createdBlog, helper.newBlog);
    });
  });

  describe('schema validation', () => {
    test('default likes set', async () => {
      const createdBlogResponse = await api
        .post(helper.url)
        .send(helper.noLikesBlog)
        .expect(201);
  
      const generatedId = createdBlogResponse.body.id;
  
      const expectedBlog = {id: generatedId, likes:0, ...helper.noLikesBlog};
  
      await api
        .get(`${helper.url}/${generatedId}`)
        .expect(200, expectedBlog);
    });
  
    test('missing title handling', async () => {
      await api
        .post(helper.url)
        .send(helper.noTitleBlog)
        .expect(400);
    });
  
    test('missing url handling', async () => {
      await api
        .post(helper.url)
        .send(helper.noUrlBlog)
        .expect(400);
    });
  });  

  describe('updating blog', () => {
    test('update blog likes', async () => {
      const response = await api
        .post(helper.url)
        .send(helper.newBlog);
      const generatedId = response.body.id;
      const expectedBlog = {
        ...helper.newBlog,
        id: generatedId,
        likes: helper.updateLikesBlog.likes
      };

      await api
        .put(`${helper.url}/${generatedId}`)
        .send(helper.updateLikesBlog)
        .expect(200, expectedBlog);
      
      await api
        .get(`${helper.url}/${generatedId}`)
        .expect(200, expectedBlog);
    });
      
    test('update whole blog', async () => {
      const response = await api
      .post(helper.url)
      .send(helper.newBlog);
      const generatedId = response.body.id;
      const expectedBlog = {
        ...helper.updateAllBlog,
        id: generatedId
      };
      
      await api
        .put(`${helper.url}/${generatedId}`)
        .send(helper.updateAllBlog)
        .expect(200, expectedBlog);
      
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
    });

    test('non-existing blog deletion', async () => {
      await api
        .delete(`${helper.url}/6a27ce9e3eb7f822ca8b2620`)
        .expect(204);
    });
  });
});