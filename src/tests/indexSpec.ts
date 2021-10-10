import app from '../index';
import request from 'request';

describe('GET/api/images', function() {
  beforeEach(function() {
    require('../index');
  });
});

it('returns 404', function(done) {
  request('http://localhost:3000/api/images/unknow', function(error, response) {
    expect(response.statusCode).toBe(404);
    done();
  });
});

it('returns no such file', function(done) {
  request('http://localhost:3000/api/images?filename=unknow', function(
    error,
    response,
    html
  ) {
    expect(html).toBe('oops...No such file or directory!');
    done();
  });
});

// it('returns image', function(done) {
//   request('http://localhost:3000/api/images?filename=fjord', function(error, response, html) {
//     expect(response).toBe('http://localhost:3000/api/images?filename=fjord');
//   });
// });
