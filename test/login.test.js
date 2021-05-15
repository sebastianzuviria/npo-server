'use-strict'

const db = require('../models/index');
const { User } = require('../models/index');
const bcrypt = require('bcrypt');

const supertest = require('supertest');
const app = require('../app');
const apiTest = supertest(app);

const testUser = {
    firstName: 'Demo',
    image: 'https://www.designevo.com/res/templates/thumb_small/colorful-hand-and-warm-community.png',
    lastName: 'Test',
    email: 'test@test.com',
    password: 'test1234',
    roleId: 1
}

// Clean DB and add testUser before run all tests
beforeAll( async () => {

    try {

        await bcrypt.hash(testUser.password, 10, async (err, hashedPassword) => {

            const { firstName, lastName, email, image, roleId } = testUser;

            await User.create({
                firstName,
                image,
                lastName,
                email,
                password: hashedPassword,
                roleId
            });
            
        });

    } catch (err) {
        console.log(err);
    }

});

describe('Authentication endpoint tests', () => {

    it('Dummy Test', async () => {

        expect(1).toBe(1);

    });

});


// Close sequelize connection after run all tests
afterAll(() => {

    db.sequelize.close();

});