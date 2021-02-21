// Write your tests here
const db = require('../data/dbConfig')
const server = require('./server');
const request = require('supertest');

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
  test('we are in the testing env', ()=>{
      expect(process.env.DB_ENV).toBe('development')
  })
})


