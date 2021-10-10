"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var request_1 = __importDefault(require("request"));
describe('GET/api/images', function () {
    beforeEach(function () {
        require('../index');
    });
});
it('returns 404', function (done) {
    (0, request_1.default)('http://localhost:3000/api/images/unknow', function (error, response) {
        expect(response.statusCode).toBe(404);
        done();
    });
});
it('returns no such file', function (done) {
    (0, request_1.default)('http://localhost:3000/api/images?filename=unknow', function (error, response, html) {
        expect(html).toBe('oops...No such file or directory!');
        done();
    });
});
it('returns image', function (done) {
    (0, request_1.default)('http://localhost:3000/api/images?filename=fjord', function (error, response, html) {
        expect(html).toBe('http://localhost:3000/api/images?filename=fjord');
    });
});
