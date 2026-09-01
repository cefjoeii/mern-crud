const assert = require('assert');

// Node 18+ provides global fetch. Adjust BASE if your server runs elsewhere.
const BASE = process.env.SERVER || 'http://127.0.0.1:3000';

async function request(method, path, body, timeout = 10000) {
  const opts = { method, headers: {} };
  if (body) {
    opts.headers['Content-Type'] = 'application/json';
    opts.body = JSON.stringify(body);
  }
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeout);
  try {
    const res = await fetch(`${BASE}${path}`, { ...opts, signal: controller.signal });
    clearTimeout(id);
    const text = await res.text();
    let json = null;
    try { json = JSON.parse(text); } catch (e) { json = text; }
    return { status: res.status, body: json };
  } catch (err) {
    clearTimeout(id);
    return { status: 0, body: { error: err && err.message ? err.message : String(err) } };
  }
}

describe('Users API', function() {
  this.timeout(5000);
  let createdId = null;
  const unique = Date.now();
  const userPayload = { name: `Test User ${unique}`, email: `test${unique}@example.com`, age: 30, gender: 'm' };

  it('creates a user', async () => {
    const res = await request('POST', '/api/users', userPayload);
    assert.strictEqual(res.status, 201, `Expected 201 on create, got ${res.status} - ${JSON.stringify(res.body)}`);
    assert.ok(res.body && res.body.success === true, 'Create response success missing');
    createdId = res.body.result && res.body.result._id;
    assert.ok(createdId, 'Created user _id missing');
  });

  it('reads the created user', async () => {
    const res = await request('GET', `/api/users/${createdId}`);
    assert.strictEqual(res.status, 200, `Expected 200 on get, got ${res.status}`);
    assert.strictEqual(res.body._id, createdId, 'Fetched user id mismatch');
  });

  it('updates the user', async () => {
    const updatePayload = { name: 'Updated Name', email: userPayload.email, age: 31, gender: 'm' };
    const res = await request('PUT', `/api/users/${createdId}`, updatePayload);
    assert.strictEqual(res.status, 200, `Expected 200 on update, got ${res.status} - ${JSON.stringify(res.body)}`);
    assert.ok(res.body.success === true, 'Update response success missing');
    assert.strictEqual(res.body.result.name, 'Updated Name', 'Update did not change name');
  });

  it('deletes the user', async () => {
    const res = await request('DELETE', `/api/users/${createdId}`);
    assert.strictEqual(res.status, 200, `Expected 200 on delete, got ${res.status}`);
    assert.ok(res.body.success === true, 'Delete response success missing');
  });

  it('confirms deletion returns 404', async () => {
    const res = await request('GET', `/api/users/${createdId}`);
    assert.strictEqual(res.status, 404, `Expected 404 for deleted user, got ${res.status}`);
  });
});
