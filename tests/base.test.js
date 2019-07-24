let request = require('supertest');
let app = require('../src/app');

describe('Test the root path', () => {
    test('It should response the GET method', () => {
        return request(app).get('/api/v1/entity').then((response) => {
            expect(response.statusCode).toBe(200);
        });
    });
});
