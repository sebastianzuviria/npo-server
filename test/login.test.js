'use-strict'

const db = require('../models/index');
const { User, Role } = require('../models/index');
const bcrypt = require('bcrypt');

const supertest = require('supertest');
const app = require('../app');
const apiTest = supertest(app);

const testUser = {
    firstName: 'Test',
    lastName: 'User',
    email: 'test@test.com',
    password: 'test1234',
    roleId: 1
}

// Clean DB and add testUser before run all tests
beforeAll( async () => {

    try {

        await db.sequelize.sync({ force: false });
        await User.destroy({ where: {} });

        const { firstName, email, lastName, password, roleId } = testUser;

        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(password, salt);

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

describe('Authentication endpoint tests', () => {

    it('(POST) must properly login', async () => {

        const response = await apiTest
            .post(`/auth/login`)
            .send({ email: 'test@test.com' })
            .send({ password: 'test1234' })
            .expect(200);

    });

    it('(POST) must fail if email isn\'t found', async () => {

        const response = await apiTest
            .post(`/auth/login`)
            .send({ email: 'none@none.com' })
            .send({ password: 'test1234' })
            .expect(404);

    });

    it('(POST) must fail if email is empty', async () => {

        const response = await apiTest
            .post(`/auth/login`)
            .send({ email: '' })
            .send({ password: 'test1234' })
            .expect(400);

        const { msg, param } = JSON.parse(response.text).errors[0];

        expect(param).toBe('email');
        expect(msg).toBe('Invalid value');

    });

    it('(POST) must fail if email is invalid', async () => {

        const response = await apiTest
            .post(`/auth/login`)
            .send({ email: 'wrongemail#' })
            .send({ password: 'test1234' })
            .expect(400);

        const { msg, param } = JSON.parse(response.text).errors[0];

        expect(param).toBe('email');
        expect(msg).toBe('Invalid value');

    });

    it('(POST) must fail if password is empty', async () => {

        const response = await apiTest
            .post(`/auth/login`)
            .send({ email: 'test@test.com' })
            .send({ password: '' })
            .expect(400);

        const { msg, param } = JSON.parse(response.text).errors[0];

        expect(param).toBe('password');
        expect(msg).toBe('Invalid value');

    });

    it('(POST) must fail if password length is invalid', async () => {

        const response = await apiTest
            .post(`/auth/login`)
            .send({ email: 'test@test.com' })
            .send({ password: 'tes' })
            .expect(400);

        const { msg, param } = JSON.parse(response.text).errors[0];

        expect(param).toBe('password');
        expect(msg).toBe('Invalid value');

    });

    it('(POST) must fail if password doesn\'t match', async () => {

        const response = await apiTest
            .post(`/auth/login`)
            .send({ email: 'test@test.com' })
            .send({ password: 'test1235' })
            .expect(400);

        const { msg } = JSON.parse(response.text);

        expect(msg).toBe('Password doesn\'t match');

    });

});


// Close sequelize connection after run all tests
afterAll(() => {

    db.sequelize.close();

});