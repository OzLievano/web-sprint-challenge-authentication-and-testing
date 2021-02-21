// Write your tests here
const db = require('../data/dbConfig')
const server = require('./server');
const request = require('supertest');

test('sanity', () => {
  expect(true).toBe(false)
})

beforeAll(async ()=>{
  await db.migrate.rollback();
  await db.migrate.latest();
})

beforeEach(async ()=>{
  await db('users').truncate()
})

afterAll(async ()=>{
  await db.destroy()
})


describe('server.js',()=>{
  test('we are in the development env', ()=>{
      expect(process.env.DB_ENV).toBe('development')
  })
  describe('GET /', ()=>{
    test('is server running? async', async()=>{
      const res = await request(server).get('/');
      expect(res.status).toBe(200);
    })
    test('return 200 OK', ()=>{
      return request(server)
        .get('/').then(res => {expect(res.status).toBe(200)})
    })
  })

  describe('GET /users', ()=>{
    test('get users working', async()=>{
      const res = await request(server).get('/api/users')
      expect(res.status).toBe(200);
    })
    test('get /users/id', async()=>{
      const res = await request(server).get('/api/users/1')
      expect(res.status).toBe(200);
    })
  })

  describe('POST /register',()=>{
    test('get registration working', async()=>{
      const newUser = {
        username:"foo",
        password:"Little Boy"
      }

      const res = await request(server).post('/api/auth/register').send(newUser)
      console.log(res)
      expect(res.status).toBe(201)
      expect(res).toBeTruthy
    })
  })
})




