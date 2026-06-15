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
    //sending users through api to store password hash correctly
    for (const user of helper.initialUsers) {
      await api
        .post(helper.url)
        .send(user);
    }
  });

  test('get all users', async () => {
    const response = await api
      .get(helper.url)
      .expect(200);
    for (const blog of response.body) {
      delete blog.id;
    }
    assert.deepStrictEqual(response.body, helper.expectedInitialUsers);
  });

  test('add new user', async () => {
    const response = await api
      .post(helper.url)
      .send(helper.newUser)
      .expect(201);
    
    const {password, ...expectedUser} = helper.newUser;
    expectedUser.id = response.body.id;

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

  test('add user missing username', async () => {
    const userNoUsername = {...helper.newUser};
    delete userNoUsername.username;

    await api
      .post(helper.url)
      .send(userNoUsername)
      .expect(400);
    
    const users = await User.find({});
    assert.deepEqual(users.length, helper.initialUsers.length);
  });

  test('add user with short username', async () => {
    const userShortUsername = {...helper.newUser, username: 'aa'};

    await api
      .post(helper.url)
      .send(userShortUsername)
      .expect(400);
    
    const users = await User.find({});
    assert.deepEqual(users.length, helper.initialUsers.length);
  });

  test('add user missing password', async () => {
    const userNoPassword = {...helper.newUser};
    delete userNoPassword.password;

    await api
      .post(helper.url)
      .send(userNoPassword)
      .expect(400);
    
    const users = await User.find({});
    assert.deepEqual(users.length, helper.initialUsers.length);
  });

  test('add user with short password', async () => {
    const userShortPassword = {...helper.newUser, password: '12'};

    await api
      .post(helper.url)
      .send(userShortPassword)
      .expect(400, {error: 'wrong password format'});
    
    const users = await User.find({});
    assert.deepEqual(users.length, helper.initialUsers.length);
  });
});