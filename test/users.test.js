const { test, beforeEach } = require('node:test');
const assert = require('node:assert');
const express = require('express');
const request = require('supertest');
const User = require('../models/user');
const usersRouter = require('../routes/users');

const app = express();
app.use(express.json());
app.use('/api/users', usersRouter);

const MISSING_ID = '000000000000000000000000';
const EXISTING_ID = '507f1f77bcf86cd799439011';
const existing = { _id: EXISTING_ID, name: 'Jane Doe', email: 'jane@example.com', age: 30, gender: 'f' };
const body = { name: 'jane doe', email: 'jane@example.com', age: 30, gender: 'f' };

// Fail loudly if a malformed id ever reaches the model
beforeEach(() => {
  const unexpected = async () => { throw new Error('model should not be called'); };
  User.findById = unexpected;
  User.findByIdAndUpdate = unexpected;
  User.findByIdAndDelete = unexpected;
});

const calls = {
  get: (id) => request(app).get(`/api/users/${id}`),
  put: (id) => request(app).put(`/api/users/${id}`).send(body),
  delete: (id) => request(app).delete(`/api/users/${id}`)
};

for (const [method, call] of Object.entries(calls)) {
  for (const id of ['not-an-id', 'abcdefghijkl']) {
    test(`${method.toUpperCase()} /:id with malformed id "${id}" returns 400`, async () => {
      const res = await call(id);
      assert.strictEqual(res.status, 400);
      assert.strictEqual(res.body.msg, 'Invalid user ID.');
    });
  }

  test(`${method.toUpperCase()} /:id with valid nonexistent id returns 404`, async () => {
    User.findById = User.findByIdAndUpdate = User.findByIdAndDelete = async () => null;
    const res = await call(MISSING_ID);
    assert.strictEqual(res.status, 404);
  });

  test(`${method.toUpperCase()} /:id with existing id returns 200`, async () => {
    User.findById = User.findByIdAndUpdate = User.findByIdAndDelete = async () => existing;
    const res = await call(EXISTING_ID);
    assert.strictEqual(res.status, 200);
  });
}
