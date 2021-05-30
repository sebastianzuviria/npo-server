'use-strict';

const db = require('../models/index');
const { User } = require('../models/index');
const encryptPassword = require('../utils/encrypt');

const supertest = require('supertest');
const app = require('../app');
const apiTest = supertest(app);

const testUser = {
    email: 'test@test.com',
    firstName: 'Test',
    lastName: 'User',
    password: 'test1234',
    roleId: 1
}

// Clean DB and add testUser before run all tests
beforeAll( async () => {

    try {

        await db.sequelize.sync({ force: false });
        await User.destroy({ where: {} });

        const { firstName, email, lastName, password, roleId } = testUser;

        const hash = await encryptPassword(password);

            await User.create({
                firstName,
                lastName,
                email,
                password: hash,
                roleId
            });

    } catch (err) {
        console.log(err);
    }

});

describe('AUTHENTICATION ENDPOINT TESTS', () => {

    test('USER must properly login', async () => {

        const response = await apiTest
            .post(`/auth/login`)
            .send({ email: 'test@test.com' })
            .send({ password: 'test1234' })
            .expect(200);

    });

    test('POST must return a proper user object', async () => {

        const response = await apiTest
            .post(`/auth/login`)
            .send({ email: 'test@test.com' })
            .send({ password: 'test1234' })
            .expect(200);

        const { firstName, lastName, email, token } = response.body;

        const resUser = {
            firstName,
            lastName,
            email
        }


        // Create a new user without password key
        const newTestUser = {

            email: testUser.email,
            firstName: testUser.firstName,
            lastName: testUser.lastName,
            
        }

        expect(resUser).toMatchObject(newTestUser);
        

        // Check if token property exists and it's defined
        expect(token).toBeTruthy();
        expect(token).toBeDefined();

    });

    test('POST must fail if email isn\'t found', async () => {

        const response = await apiTest
            .post(`/auth/login`)
            .send({ email: 'none@none.com' })
            .send({ password: 'test1234' })
            .expect(404);

        const { msg } = response.body;

        expect(msg).toBe('Email not found');

    });

    test('POST must fail if email is empty', async () => {

        const response = await apiTest
            .post(`/auth/login`)
            .send({ email: '' })
            .send({ password: 'test1234' })
            .expect(400);

        const { msg, param } = response.body.errors[0];

        expect(param).toBe('email');
        expect(msg).toBe('Invalid value');

    });

    test('POST must fail if email is invalid', async () => {

        const response = await apiTest
            .post(`/auth/login`)
            .send({ email: 'wrongemail#' })
            .send({ password: 'test1234' })
            .expect(400);

        const { msg, param } = response.body.errors[0];

        expect(param).toBe('email');
        expect(msg).toBe('Invalid value');

    });

    test('POST must fail if password is empty', async () => {

        const response = await apiTest
            .post(`/auth/login`)
            .send({ email: 'test@test.com' })
            .send({ password: '' })
            .expect(400);

        const { msg, param } = response.body.errors[0];

        expect(param).toBe('password');
        expect(msg).toBe('Invalid value');

    });

    test('POST must fail if password length is invalid', async () => {

        const response = await apiTest
            .post(`/auth/login`)
            .send({ email: 'test@test.com' })
            .send({ password: 'tes' })
            .expect(400);

        const { msg, param } = response.body.errors[0];

        expect(param).toBe('password');
        expect(msg).toBe('Invalid value');

    });

    test('POST must fail if password doesn\'t match', async () => {

        const response = await apiTest
            .post(`/auth/login`)
            .send({ email: 'test@test.com' })
            .send({ password: 'test1235' })
            .expect(400);

        const { msg } = response.body;

        expect(msg).toBe('Password doesn\'t match');

    });

});


// Close sequelize connection after run all tests
afterAll(() => {

    db.sequelize.close();

});