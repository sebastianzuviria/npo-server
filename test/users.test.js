const db = require('../models/index');
const { User } = require('../models/index');
const supertest = require('supertest');
const app = require('../app');
const apiTest = supertest(app);

const adminUser = {
  firstName: 'admin',
  lastName: 'root',
  email: 'admin@admin.com',
  password: 'adminroot',
  roleId: 1
};

const simpleUser = {
  firstName: 'Pepito',
  lastName: 'Suraz',
  email: 'pepito@email.com',
  roleId: 2,
  password: 'notadmin'
};
let token;

beforeAll(async () => {
  try {
    await db.sequelize.sync({ force: false, debug: false });
    await User.destroy({ where: {} });
  } catch (error) {
    console.log(error);
  }
});

describe('Users endpoint test', () => {
  describe('(POST) a user can register', () => {
    test('return user data and JWT when a new user register successfully', async () => {
      const userData = await apiTest
        .post('/users/auth/register')
        .send(adminUser)
        .expect(200)
        .expect('Content-Type', /application\/json/);
      expect(userData.body.token).toBeDefined();
      expect(Object.keys(userData.body).indexOf('password')).toBe(-1);
      token = userData.body.token;
    });

    test('should fail if email is already in use', async () => {
      const response = await apiTest
        .post('/users/auth/register')
        .send(adminUser)
        .expect(409)
        .expect('Content-Type', /application\/json/);
      const { message } = response.body;
      expect(message).toBe('User already registered');
    });

    test('should fail if any of the parameters is invalid', async () => {
      const response = await apiTest
        .post('/users/auth/register')
        .send({ ...adminUser, roleId: null })
        .expect(400)
        .expect('Content-Type', /application\/json/);
      const { errors } = response.body;
      expect(errors).toBeTruthy();
    });
  });

  describe('(GET) admin can list all users', () => {
    test('a list of users should be returned as an array', async () => {
      const userList = await apiTest
        .get('/users')
        .set('Authorization', `Bearer ${token}`)
        .expect(200);
      expect(userList.body.length).toBeGreaterThanOrEqual(0);
    });
    test('an admin user have to send a JWT with credentials', async () => {
      await apiTest
        .get('/users')
        .expect(401)
        .expect('Content-Type', /application\/json/);
    });

    test('a standard user cannot list all users', async () => {
      const tokenBody = await apiTest
        .post('/users/auth/register')
        .send(simpleUser);
      const jwt = tokenBody.body.token;

      await apiTest
        .get('/users')
        .set('Authorization', `Bearer ${jwt}`)
        .expect(401)
        .expect('Content-Type', /application\/json/);
    });
  });

  describe('(GET) info of my data', () => {
    test('a object with user data should be returned', async () => {
      const expected = ['firstName', 'lastName', 'id', 'roleId', 'email'];
      const response = await apiTest
        .get('/users/auth/me')
        .set('Authorization', `Bearer ${token}`)
        .expect(200);
      expect(Object.keys(response.body)).toEqual(
        expect.arrayContaining(expected)
      );
    });

    test('error should returned if user is not logged in', async () => {
      await apiTest.get('/users/auth/me').expect(401);
    });
  });

  describe('(DELETE) my user', () => {
    test('the user want to delete his account', async () => {
      await apiTest
        .delete('/users')
        .set('Authorization', `Bearer ${token}`)
        .expect(200);
    });
    test('error should returned if user is not logged in', async () => {
      await apiTest.delete('/users').expect(401);
    });
  });
});

afterAll(async () => {
  await db.sequelize.close();
});
