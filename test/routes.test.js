import request from 'supertest';
import app from '../src/app.js';
import * as winston from 'winston';

describe('root', () => {
  it('should render properly', async () => {
    await request(app).get('/').expect(200);
  });
});

describe('getting an animal', () => {
  const giraffe = {name: 'giraffe',
                   home: 'savannah',
                   size: 'big'};

  it('should clear', async () => {
    await request(app)
      .delete('/api/animals')
      .expect(204);
  });

  it('should not find giraffe', async () => {
    await request(app)
      .get('/api/animals/giraffe')
      .set('Accept', 'application/json')
      .expect(404);
  });

  it('should create giraffe', async () => {
    await request(app).post('/api/animals')
      .set('Accept', 'application/json')
      .send(giraffe)
      .expect(201)
      .expect('Content-Type', /json/)
      .expect(giraffe);
  });

  it('should get giraffe', async () => {
    await request(app)
      .get('/api/animals/giraffe')
      .set('Accept', 'application/json')
      .expect(200)
      .expect('Content-Type', /json/)
      .expect(giraffe);
  });
});

describe('getting multiple animals', () => {
  const monkey = {name: 'monkey',
                  home: 'jungle',
                  size: 'medium'},
        ferret = {name: 'ferret',
                  home: 'forest',
                  size: 'small'};

  it('should clear', async () => {
    await request(app)
      .delete('/api/animals')
      .expect(204);
  });

  it('should get animals', async () => {
    await request(app).get('/api/animals?name=e')
      .set('Accept', 'application/json')
      .send(ferret)
      .expect(200)
      .expect('Content-Type', /json/)
      .expect([]);
  });

  it('should create monkey', async () => {
    await request(app).post('/api/animals')
      .set('Accept', 'application/json')
      .send(monkey)
      .expect(201)
      .expect('Content-Type', /json/)
      .expect(monkey);
  });

  it('should create ferret', async () => {
    await request(app).post('/api/animals')
      .set('Accept', 'application/json')
      .send(ferret)
      .expect(201)
      .expect('Content-Type', /json/)
      .expect(ferret);
  });

  it('should get all animals', async () => {
    await request(app).get('/api/animals')
      .set('Accept', 'application/json')
      .send(ferret)
      .expect(200)
      .expect('Content-Type', /json/)
      .expect([monkey, ferret]);
  });

  it('should get both animals', async () => {
    await request(app).get('/api/animals?name=e')
      .set('Accept', 'application/json')
      .send(ferret)
      .expect(200)
      .expect('Content-Type', /json/)
      .expect([monkey, ferret]);
  });

  it('should get just monkey', async () => {
    await request(app).get('/api/animals?name=monk')
      .set('Accept', 'application/json')
      .send(ferret)
      .expect(200)
      .expect('Content-Type', /json/)
      .expect([monkey]);
  });
});

describe('not found', () => {
  it('should default to text/html', async () => {
    await request(app)
      .get('/nothing')
      .expect(404)
      .expect('<p>Resource not found.</p>');
  });

  it('should return text/plain', async () => {
    await request(app)
      .get('/nothing')
      .set('Accept', 'text/html')
      .expect(404)
      .expect('<p>Resource not found.</p>');
  });

  it('should return application/json', async () => {
    await request(app)
      .get('/nothing')
      .set('Accept', 'application/json')
      .expect(404)
      .expect({message: 'Resource not found.'});
  });

  it('should return text/plain', async () => {
    await request(app)
      .get('/nothing')
      .set('Accept', 'text/plain')
      .expect(404)
      .expect('Resource not found.');
  });
});
