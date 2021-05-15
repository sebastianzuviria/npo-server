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

    it('Dummy Test', async () => {

        await expect(1).toBe(1);

    });

});


// Close sequelize connection after run all tests
afterAll(() => {

    db.sequelize.close();

});