const db = require('../models/index');
const { Contact, User } = require('../models/index');
const jwt = require('jsonwebtoken');
const supertest = require('supertest');
const app = require('../app');
const apiTest = supertest(app);

const newContact = {
  name: 'Esteban',
  email: 'estebanquito@gmail.com',
  phone: '+543704569871',
  message: 'Lorem ipsum sit amet',
};

describe('Contacts endpoint test', () => {
  describe('GET contacts', () => {
    test('Trying to get a list of contacts being a normal user should return 401 error', async () => {
      const user = await User.findOne({
        where: { email: 'jose@mail.com' },
      });

      const token = jwt.sign(
        {
          id: user.dataValues.id,
          roleId: user.dataValues.roleId,
        },
        process.env.SECRET
      );

      await apiTest
        .get('/contacts')
        .set('Authorization', `Bearer ${token}`)
        .expect(401);
    });

    test('Trying to get a list of contacts being admin should return response 200', async () => {
      const user = await User.findOne({
        where: { email: 'franco@email.com' },
      });

      const token = jwt.sign(
        {
          id: user.dataValues.id,
          roleId: user.dataValues.roleId,
        },
        process.env.SECRET
      );

      await apiTest
        .get('/contacts')
        .set('Authorization', `Bearer ${token}`)
        .expect(200);
    });
  });

  describe('POST contacts', () => {
    test('Sending valid contact details should return response 201', async () => {
      const { name, email, phone, message } = newContact;

      await apiTest.post('/contacts').send(newContact).expect(201);
    });

    test('Sending contact details with invalid characters in name field should return 400 error ', async () => {
      const { email, phone, message } = newContact;

      await apiTest
        .post('/contacts')
        .send({ name: '---', email, phone, message })
        .expect(400);
    });

    test('Sending contact details with name field empty should return 400 error ', async () => {
      const { email, phone, message } = newContact;

      await apiTest
        .post('/contacts')
        .send({ email, phone, message })
        .expect(400);
    });

    test('Sending contact details with invalid email should return 400 error ', async () => {
      const { name, phone, message } = newContact;

      await apiTest
        .post('/contacts')
        .send({ name, email: 'estebanquito@gmail', phone, message })
        .expect(400);
    });

    test('Sending contact details without including phone number should return response 201 ', async () => {
      const { name, email, message } = newContact;

      await apiTest
        .post('/contacts')
        .send({ name, email, message })
        .expect(201);
    });

    test('Sending contact details including message with numbers returns response 201 ', async () => {
      const { name, email, phone, message } = newContact;

      await apiTest
        .post('/contacts')
        .send({ name, email, phone, message: '888' })
        .expect(201);
    });
  });
});

afterAll(() => {
  db.sequelize.close();
});
