import supertest from 'supertest';
import {test, describe, beforeEach} from 'node:test';
import User from '../models/user.js';
import app from '../app.js';
import mongoose from 'mongoose';
import assert from 'node:assert';
import '../utils/dbTestHelper.js';
import * as helper from '../utils/userControllerTestHelper.js';

const api = supertest(app);
describe('user controller', () => {
  beforeEach(async () => {
    await User.deleteMany({});
    await User.insertMany(helper.initialUsers);
  });

  test('add new user', async () => {
    const response = await api
      .post(helper.url)
      .send(helper.newUser)
      .expect(201);
    
    const expectedUser = {
      username: helper.newUser.username,
      name: helper.newUser.name,
      id: response.body.id
    };
    assert.deepStrictEqual(response.body, expectedUser);

    const users = await User.find({});
    assert.deepEqual(users.length, helper.initialUsers.length + 1);
  });

  test('add duplicate user', async () => {
    await api
      .post(helper.url)
      .send(helper.initialUsers[0])
      .expect(400);
    
    const users = await User.find({});
    assert.deepEqual(users.length, helper.initialUsers.length);
  });
});