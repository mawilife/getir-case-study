import supertest from 'supertest';
import app, { dbcon, server } from '../../src/index';

describe('API TEST (e2e)', () => {

    beforeEach(async () => {
    });

    it('/ (POST) Validation Error', (done) => {
        return supertest(app)
            .post("/")
            .send({})
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .then(res => {
                expect(res.status).toBe(200);
                expect(res.body).toStrictEqual({
                    "code": 1001,
                    "msg": "ValidationError"
                });
                done();
            });
    });

    it('/ (POST) Success', (done) => {
        return supertest(app)
            .post("/")
            .send({
                "startDate": "2016-01-26",
                "endDate": "2018-02-02",
                "minCount": 0,
                "maxCount": 0
            })
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .then(res => {
                expect(res.status).toBe(200);
                expect(res.body).toEqual(
                    expect.objectContaining({
                        "code": 0,
                        "msg": "Success"
                    })
                );
                done();
            });
    });
    afterAll(() => {
        dbcon.end();
        server.close();
    })
});
