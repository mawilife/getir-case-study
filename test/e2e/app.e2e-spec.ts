import supertest from 'supertest';
import app from '../../src/index';

describe('API TEST (e2e)', () => {

	beforeEach(async () => {
	});

	it('/ (POST) Validation Error', () => {
		return supertest(app)
		.post("/")
		.send({})
		.set('Accept', 'application/json')
		.expect('Content-Type', /json/)
		.expect(200)
		.expect({
			"code": 1001,
			"msg": "ValidationError"
		});
	});
	it('/ (POST) Success', () => {
		return supertest(app)
		.post("/")
		.send({
			"startDate": "2016-01-26",
			"endDate": "2018-02-02",
			"minCount": 2700,
			"maxCount": 3000
			})
		.set('Accept', 'application/json')
		.expect('Content-Type', /json/)
		.expect(200)
	});
});
