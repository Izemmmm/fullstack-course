import supertest from 'supertest';
import {test, describe, beforeEach} from 'node:test';
import User from '../models/user.js';
import app from '../app.js';
import mongoose from 'mongoose';
import assert from 'node:assert';
import '../utils/dbTestHelper.js';
import * as helper from '../utils/loginControllerTestHelper.js';
import { error } from 'node:console';

const api = supertest(app);

describe('login tests', () => {
  beforeEach(async () => {
    await User.deleteMany({});
    for (const user of helper.initialUsers) {
      await api.post(helper.usersUrl).send(user);
    }
  });

  test('non-existing user', async () => {
    await api
      .post(helper.loginUrl)
      .send({username: 'notexists', password: '1234'})
      .expect(401, {error: 'username or password is invalid'});
  });

  test('wrong password', async () => {
    await api
      .post(helper.loginUrl)
      .send({
        username: helper.initialUsers[0].username,
        password: '1234'})
      .expect(401, {error: 'username or password is invalid'});
  });

  test('login successfully', async () => {
    const response = await api
      .post(helper.loginUrl)
      .send({
        username: helper.initialUsers[0].username,
        password: helper.initialUsers[0].password})
      .expect(200);
    
    const {token, username, name} = response.body;
    
    assert(token.length > 0);
    assert.strictEqual(username, helper.initialUsers[0].username);
    assert.strictEqual(name, helper.initialUsers[0].name);
  });
});