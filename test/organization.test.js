const db = require('../models/index');
const { Organization } = require('../models/index');
const supertest = require('supertest');
const app = require('../app');

const api = supertest(app);

const initial = [
    {
        id: 1,
        name: "Zonas grises",
        image: "image.jpg",
        address: "cll 123",
        welcomeText: "info organization",
        socialmedia: {
            facebook: "https://www.facebook.com/",
            instagram: "https://www.instagram.com/",
            linkedin: "https://www.linkedin.com/" 
        }
    }
]

describe('/organizations/public',() => {

    test('GET status 200 if exist', async () => {

        await api
        .get('/organizations/public')
        .expect(200)
        .expect('Content-Type', /application\/json/)

    })

    
    test('PUT authorized token and id exist', async () => {
        const { id, name, image, address, welcomeText } = initial[0];
        await api
        .put(`/organizations/${id}`)
        .set('authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyLCJyb2xlSWQiOjF9.50hjprqNYLSiv1aRpoSNuPxWB9XBC03xfOI4PZ89KUs')
        .send({name, image, address, welcomeText})
        .expect(200)
        .expect('Content-Type', /application\/json/)
    })
    
})
    

afterAll(() => {
    
    db.sequelize.close();

})