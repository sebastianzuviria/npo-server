const db = require('../models/index');
const supertest = require('supertest');
const app = require('../app');
const apiTest = supertest(app);
const path = require('path');

const newUser = {
  firstName: 'admin',
  lastName: 'root',
  email: 'admin@admin.com',
  password: 'adminroot'
};

const adminUser = {
  email: 'ariel@email.com',
  password: 'usuariotest'
};

let standardToken;
let adminToken;

describe('Users endpoint test', () => {
  describe('(POST) /users/auth/me  a user can register', () => {
    test('return user data and JWT when a new user register successfully', async () => {
      const userData = await apiTest
        .post('/users/auth/register')
        .send(newUser)
        .expect(200)
        .expect('Content-Type', /application\/json/);
      expect(userData.body.token).toBeDefined();
      expect(Object.keys(userData.body).indexOf('password')).toBe(-1);
      standardToken = userData.body.token;
    });

    test('should fail if email is already in use', async () => {
      const response = await apiTest
        .post('/users/auth/register')
        .send(newUser)
        .expect(409)
        .expect('Content-Type', /application\/json/);
      const { message } = response.body;
      expect(message).toBe('User already registered');
    });

    test('should fail if email is not valid', async () => {
      const response = await apiTest
        .post('/users/auth/register')
        .send({ ...newUser, email: 'notemail' })
        .expect(400)
        .expect('Content-Type', /application\/json/);
      const { errors } = response.body;
      expect(errors).toBeTruthy();
    });

    test('should fail if firstName is not alphabetic', async () => {
      const response = await apiTest
        .post('/users/auth/register')
        .send({ ...newUser, firstName: 'NotAlpha123#' })
        .expect(400)
        .expect('Content-Type', /application\/json/);
      const { errors } = response.body;
      expect(errors).toBeTruthy();
    });

    test('should fail if lastName is not alphabetic', async () => {
      const response = await apiTest
        .post('/users/auth/register')
        .send({ ...newUser, lastName: 'NotAlpha123' })
        .expect(400)
        .expect('Content-Type', /application\/json/);
      const { errors } = response.body;
      expect(errors).toBeTruthy();
    });
  });

  describe('(GET) /users  admin can list all users', () => {
    test('a list of users should be returned as an array', async () => {
      const adminUserData = await apiTest
        .post('/auth/login')
        .send(adminUser)
        .expect(200);
      adminToken = adminUserData.body.token;

      const userList = await apiTest
        .get('/users')
        .set('Authorization', `Bearer ${adminToken}`)
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
      await apiTest
        .get('/users')
        .set('Authorization', `Bearer ${standardToken}`)
        .expect(401)
        .expect('Content-Type', /application\/json/);
    });
  });

  describe('(GET) /users/auth/me info of my data', () => {
    test('a object with user data should be returned', async () => {
      const expected = ['firstName', 'lastName', 'id', 'roleId', 'email'];
      const response = await apiTest
        .get('/users/auth/me')
        .set('Authorization', `Bearer ${standardToken}`)
        .expect(200);
      expect(Object.keys(response.body)).toEqual(
        expect.arrayContaining(expected)
      );
    });

    test('error should returned if user is not logged in', async () => {
      await apiTest.get('/users/auth/me').expect(401);
    });
  });

  describe('(PUT) /users update my data', () => {
    test('an error should be returned if user is not logged in', async () => {
      await apiTest
        .put('/users')
        .send({ email: 'email@email.com' })
        .expect(401);
    });

    test('an object with updated data should be returned', async () => {
      const expectedValues = ['firstName', 'lastName', 'email'];
      const dataToUpdate = {
        firstName: 'Cosme',
        lastName: 'fulanito',
        email: 'email@mai.com'
      };

      await apiTest
        .put('/users')
        .set('Authorization', `Bearer ${adminToken}`)
        .send(dataToUpdate)
        .expect(200);

      expect(Object.keys(dataToUpdate)).toEqual(
        expect.arrayContaining(expectedValues)
      );
    });

    test('an error should be returned if firstName is not alphabetic', async () => {
      await apiTest
        .put('/users')
        .set('Authorization', `Bearer ${adminToken}`)
        .send({ firstName: 'kasdfj123' })
        .expect(400);
    });

    test('an error should be returned if lastName is not alphabetic', async () => {
      await apiTest
        .put('/users')
        .set('Authorization', `Bearer ${adminToken}`)
        .send({ lastName: 'kasdfj123' })
        .expect(400);
    });

    test('an error should be returned if email is not valid', async () => {
      await apiTest
        .put('/users')
        .set('Authorization', `Bearer ${adminToken}`)
        .send({ email: 'sdklfj' })
        .expect(400);
    });
  });

  describe('(PUT) /users/updateimage update profile image', () => {
    const filePath = path.join(__dirname, '/alkemy_demo.png');

    test('an error should be returned if user is not logged in', async () => {
      await apiTest
        .put('/users/updateimage')
        .attach('image', filePath)
        .expect(401);
    });

    test('an url of the image should be returned', async () => {
      const response = await apiTest
        .put('/users/updateimage')
        .set('Authorization', `Bearer ${adminToken}`)
        .attach('image', filePath)
        .expect(200);

      expect(response.body.image).toBeDefined();
    });
  });

  describe('(PUT) /users/:id update roleId', () => {
    const roleId = 2;
    const id = 5;
    test('an error should be returned if user is not admin', async () => {
      await apiTest
        .put(`/users/${id}`)
        .set('Authorization', `Bearer ${standardToken}`)
        .send({ roleId })
        .expect(401);
    });

    test('message should be returned if update is successfully', async () => {
      const response = await apiTest
        .put(`/users/${id}`)
        .set('Authorization', `Bearer ${adminToken}`)
        .send({ roleId })
        .expect(200);

      expect(response.body.message).toBe('RoleId updated!');
      expect(response.body.ok).toBeTruthy();
    });
  });

  describe('(DELETE) /users/:id', () => {
    const id = 4;
    test('error should be returned if admin user is not logged in', async () => {
      await apiTest.delete(`/users/${id}`).expect(401);
    });
    test('admin can delete a user', async () => {
      const response = await apiTest
        .delete(`/users/${id}`)
        .set('Authorization', `Bearer ${adminToken}`)
        .expect(200);

      expect(response.body.message).toBe('User deleted successfuly');
    });

    test('error message should be returned if user not exists', async () => {
      const response = await apiTest
        .delete(`/users/${id}`)
        .set('Authorization', `Bearer ${adminToken}`)
        .expect(404);

      expect(response.body.message).toBe('user not found');
    });
  });
});

afterAll(async () => {
  await db.sequelize.close();
});
