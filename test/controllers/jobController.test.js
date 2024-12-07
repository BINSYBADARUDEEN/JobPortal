const request = require('supertest');
const express = require('express');
const jobController = require('../../controllers/jobController');

//db connection mocking
jest.mock('../../database/connection', () => ({
    query: jest.fn(),
}));

const db = require('../../database/connection');
