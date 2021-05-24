const db = require('../models/index');
const { Contact } = require('../models/index');
const supertest = require('supertest');
const app = require('../app');
const apiTest = supertest(app);

const newContact = {
  name: 'Esteban',
  email: 'estebanquito@gmail.com',
  phone: '+543704569871',
  message: 'Lorem ipsum sit amet',
};

beforeAll(async () => {
  try {
    await db.sequelize.sync({ force: false });
    await Contact.destroy({ where: {} });
    await Contact.create(newContact);
  } catch (error) {
    console.log(error);
  }
});

describe('Contacts endpoint test', () => {
  describe('GET contacts', () => {
    test('Trying to get a list of contacts without token should return 401 error', async () => {
      await apiTest.get('/contacts').expect(401);
    });

    test('Trying to get a list of contacts with a valid token should return response 200', async () => {
      await apiTest
        .get('/contacts')
        .set(
          'Authorization',
          'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyLCJyb2xlSWQiOjF9.XW9GdvLyY5MsyxilOP9RvijNee1LeyDA6iaw7SuPofc'
        )
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
