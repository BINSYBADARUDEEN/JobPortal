const request = require('supertest');
const express = require('express');
const jobController = require('../../controllers/jobController');

//db connection mocking
jest.mock('../../database/connection', () => ({
    query: jest.fn(),
}));

const db = require('../../database/connection');
const app = express();
app.use(express.json());
//mocking the routes for test
app.post('/jobs', jobController.createJob);
app.put('/jobs/:id', jobController.updateJob);

describe('Job Controller', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });
    describe('createJob', () => {
        it('create a new job', async () => {
            const mockResult = { insertId: 1 };
            db.query.mockImplementation((sql, params, callback) => callback(null, mockResult));
            const response = await request(app)
                .post('/jobs')
                .send({
                    title: 'Kitchen Potter',
                    description: '6 months experience mandatory',
                    company: 'Zam Zam Cafe',
                    location: 'Kerala',
                    salary: 80000,
                    email: 'zamzamcafe@gmail.com',
                });
            expect(response.status).toBe(201);
            expect(response.body).toEqual({ message: 'Job created successfully', jobId: 1 });
            expect(db.query).toHaveBeenCalledWith(
                expect.stringContaining('INSERT INTO jobs'),
                expect.any(Array),
                expect.any(Function)
            );
        });
        it('return 500 for a database error', async () => {
            db.query.mockImplementation((sql, params, callback) => callback(new Error('Database error')));

            const response = await request(app)
                .post('/jobs')
                .send({
                    title: 'Kitchen Potter',
                    description: '6 months experience mandatory',
                    company: 'Zam Zam Cafe',
                    location: 'Kerala',
                    salary: 80000,
                    email: 'zamzamcafe@gmail.com',
                });

            expect(response.status).toBe(500);
            expect(response.text).toContain('Database error');
        });
    });
});
