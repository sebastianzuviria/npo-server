const db = require('../models/index')
const { Members } = require('../models/index')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

const initialMembers = [
    {
        name: 'Memeber 1',
        image: 'image.jpg',
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
        name: 'Memeber 2',
        image: 'image2.jpg',
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
        name: 'Memeber 3',
        image: 'image3.jpg',
        createdAt: new Date(),
        updatedAt: new Date()
    },
]

beforeAll(async () => {
    await db.sequelize.sync({ force: false })
})

beforeEach(async () => {
    await Members.destroy({ where: {}})
    await Members.create(initialMembers[0])
    await Members.create(initialMembers[1])
    await Members.create(initialMembers[2])
})

describe('MEMBERS ENDPOINT TEST', () => {
    describe('when there is initially some members saved', () => {
        test('Members are returned as json', async () => {
            await api
                .get('/members')
                .expect(200)
                .expect('Content-Type', /application\/json/)
        })

        test('GET all', async () => {
            const res = await api.get('/members');
            expect(res.body).toHaveLength(initialMembers.length);
        });
    })


    describe('POST tests', () => {
        test('a valid member can be added and type: member is added', async () => {
 
            const newMember = {
                name: 'Memeber 4',
                image: 'image4.jpg',
            }

            await api
                .post('/members')
                .send(newMember)
                .expect(201)
                .expect('Content-Type', /application\/json/)
            
        })

        test('name and image must exist to POST', async () => {
            const newMember = {}

            const res = await api
                .post('/members')
                .send(newMember)
                .expect(400)
                .expect('Content-Type', /application\/json/)

            expect(res.body).toHaveProperty('message')

        })

        test('POST must fail if a field is empty', async () => {
 
            const newMember = {
                name: '',
                image: '',
            }
    
            const res = await api.post('/members')
                .send(newMember)
                .expect(400);
    
             expect(res.body).toHaveProperty('message')
    
        });

    })

    describe('DELETE tests', () => {
        test('delete a member successfully', async () => {
            
            const res = await Members.findAll({ where: {} });
            await api
                .delete(`/members/${res[0].dataValues.id}`)
                .expect(200);
        })

        test('DELETE must fail if ID doesn\'t exists', async () => {
    
            const res = await Members.findAll({where: {}, order: [ [ 'id', 'DESC' ]]});
            console.log( res[0].dataValues.id + 1, 'idddd');
            console.log( res[0], 'idddd');
    
            const response = await api
                .delete(`/members/${ res[0].dataValues.id + 1 }`)
                .expect(400);
    
            expect(res.body).toHaveProperty('err')
            
    
        });
    })

    describe('PUT tests', () =>{
        test('update a member successfully', async () => {
            const updatedMember = {
                name: 'Member edited',
                image: 'image5.jpg',
            }
            
            const res = await Members.findAll({ limit: 1, where: {} })

            const response = await api
                .put(`/members/${res[0].dataValues.id}`)
                .send(updatedMember)
                .expect(200);
    

        })

        test('try update a member with an invalid id return a message error', async () => {
            const updatedMember = {
                name: 'Member edited',
                image: 'image5.jpg',
            }
            const expected = { error: 'Member not Found'}
            
            const res = await Members.findAll({where: {}, order: [ [ 'id', 'DESC' ]]});

            const response = await api
                .put(`/members/${ res[0].dataValues.id + 1 }`)
                .send(updatedMember)
                .expect(404);
            
            expect(response.body).toMatchObject(expected)
        })

        test('name, image must exist to updated a member', async () => {
            const res = await Members.findAll({ limit: 1, where: {} })
            const updatedMember = {}

            const response = await api
                .put(`/members/${res[0].dataValues.id}`)
                .send(updatedMember)
                .expect(400)
                .expect('Content-Type', /application\/json/)
 
        })

        test('name, image cant be empty to updated a Member', async () => {
            const res = await Members.findAll({ where: {} })
            const updatedMember = {
                name: '',
                image: '',

            }

            const response = await api
                .put(`/members/${res[0].dataValues.id}`)
                .send(updatedMember)
                .expect(400)
                .expect('Content-Type', /application\/json/)

                expect(res.body).toHaveProperty('message')
        })
    })
})

afterAll(() => {
    db.sequelize.close()
})