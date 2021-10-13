import app from '../index';
import supertest from 'supertest';
import { response } from 'express';

describe('Test endpoint responses', () => {
  let request: supertest.SuperTest<supertest.Test>;

  beforeEach(function() {
    request = supertest(app);
  });

  it('returns 200', async done => {
    const response = await request.get('/api/images');
    expect(response.status).toBe(200);
    done();
  });

  it('returns no such file', async done => {
    const response = await request.get('/api/images?filename=unknow');
    expect(response.text).toBe('oops...No such file or directory!');
    done();
  });

  it('returns html file', done => {
    request.get('/api/images?filename=fjord').then(response => {
      expect(response.text).toBeDefined();
      done();
    });
  });
});
