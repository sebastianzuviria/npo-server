const db = require('../models/index')
const { Novelty } = require('../models/index')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

const initialNovelties = [
    {
        title: 'News 1',
        image: 'image.jpg',
        type: 'news',
        content: `<p>Lorem dolor sit amet, consectetur adipiscing elit. Pellentesque vel mi ut
        velit tempor aliquam eget eget enim. Proin cursus eleifend pretium. Aliquam cursus 
        pellentesque interdum. Vivamus placerat id leo a pellentesque. Vivamus a congue urna,
        sed porta eros. Etiam finibus magna et est aliquam, sed semper libero facilisis. 
        Donec lectus lorem, rhoncus vitae quam eget, vulputate gravida elit. Praesent ultricies
        eros id velit condimentum, eu ultrices nisl consequat.</p>`,
        categoryId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
        title: 'News 2',
        image: 'image2.jpg',
        type: 'news',
        content: `<p>Lorem dolor sit amet, consectetur adipiscing elit. Pellentesque vel mi ut
        velit tempor aliquam eget eget enim. Proin cursus eleifend pretium. Aliquam cursus 
        pellentesque interdum. Vivamus placerat id leo a pellentesque. Vivamus a congue urna,
        sed porta eros. Etiam finibus magna et est aliquam, sed semper libero facilisis. 
        Donec lectus lorem, rhoncus vitae quam eget, vulputate gravida elit. Praesent ultricies
        eros id velit condimentum, eu ultrices nisl consequat.</p>`,
        categoryId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
        title: 'News 3',
        image: 'image3.jpg',
        type: 'news',
        content: `<p>Lorem dolor sit amet, consectetur adipiscing elit. Pellentesque vel mi ut
        velit tempor aliquam eget eget enim. Proin cursus eleifend pretium. Aliquam cursus 
        pellentesque interdum. Vivamus placerat id leo a pellentesque. Vivamus a congue urna,
        sed porta eros. Etiam finibus magna et est aliquam, sed semper libero facilisis. 
        Donec lectus lorem, rhoncus vitae quam eget, vulputate gravida elit. Praesent ultricies
        eros id velit condimentum, eu ultrices nisl consequat.</p>`,
        categoryId: 3,
        createdAt: new Date(),
        updatedAt: new Date()
    },
]

beforeAll(async () => {
    await db.sequelize.sync({ force: false })
})

beforeEach(async () => {
    await Novelty.destroy({ where: {}})
    await Novelty.create(initialNovelties[0])
    await Novelty.create(initialNovelties[1])
    await Novelty.create(initialNovelties[2])
})

test('novelties are returned as json', async () => {
    await api
        .get('/news')
        .expect(200)
        .expect('Content-Type', /application\/json/)
})

test('id is defined', async () => {
    const response = await api.get('/news')

    const ids = response.body.map(n => n.id)
    expect(ids).toBeDefined()
})

test('all news are returned', async () => {
    const response = await api.get('/news')

    expect(response.body).toHaveLength(initialNovelties.length)
})

test('novelties are returned by id', async () => {
    const returnedNovelties = await Novelty.findAll({ where: {}})
    await api
        .get(`/news/${returnedNovelties[0].dataValues.id}`)
        .expect(200)
        .expect('Content-Type', /application\/json/)
    await api
        .get(`/news/${returnedNovelties[1].dataValues.id}`)
        .expect(200)
        .expect('Content-Type', /application\/json/)
    await api
        .get(`/news/${returnedNovelties[2].dataValues.id}`)
        .expect(200)
        .expect('Content-Type', /application\/json/)
})

test('if id not exist, return a status code 400 with message', async () => {
    const returnedNovelties = await Novelty.findAll({ where: {} })
    const expected = { error: 'new not exist' }
    const response = await api
        .get(`/news/${returnedNovelties[2].dataValues.id + 1}`)
        .expect(400)
        .expect('Content-Type', /application\/json/)
    
    expect(response.body).toHaveProperty('error')
    expect(response.body).toMatchObject(expected)   
})


test('a valid novelty can be added and type: news is added', async () => {
    const newNovelty = {
        title: 'News 4',
        image: 'image4.jpg',
        content: `<p>Lorem dolor sit amet, consectetur adipiscing elit. Pellentesque vel mi ut
        velit tempor aliquam eget eget enim. Proin cursus eleifend pretium. Aliquam cursus 
        pellentesque interdum. Vivamus placerat id leo a pellentesque. Vivamus a congue urna,
        sed porta eros. Etiam finibus magna et est aliquam, sed semper libero facilisis. 
        Donec lectus lorem, rhoncus vitae quam eget, vulputate gravida elit. Praesent ultricies
        eros id velit condimentum, eu ultrices nisl consequat.</p>`,
        category: 'category 1',
    }

    await api
        .post('/news')
        .send(newNovelty)
        .expect(201)
        .expect('Content-Type', /application\/json/)
    
    const novelties = await Novelty.findAll({ where: { type: 'news' }})
    const noveltiesAtEnd = novelties.map(n => n.toJSON())

    expect(noveltiesAtEnd).toHaveLength(initialNovelties.length + 1)
})

test('title, image, content, category must exist to POST', async () => {
    const newNovelty = {}

    const response = await api
        .post('/news')
        .send(newNovelty)
        .expect(400)
        .expect('Content-Type', /application\/json/)

    expect(response.body).toHaveProperty('validationErrors')
    expect(response.body.validationErrors).toHaveLength(8)    
    const novelties = await Novelty.findAll({ where: { type: 'news' }})
    const noveltiesAtEnd = novelties.map(n => n.toJSON())

    expect(noveltiesAtEnd).toHaveLength(initialNovelties.length)
})

test('delete a novelty successfully', async () => {
    const returnedNovelties = await Novelty.findAll({ where: {} })

    await api
        .delete(`/news/${returnedNovelties[0].dataValues.id}`)
        .expect(204)
    
    const novelties = await Novelty.findAll({ where: {} })
    const noveltiesAfterDelete = novelties.map(n => n.toJSON())
    expect(noveltiesAfterDelete).toHaveLength(initialNovelties.length - 1)   
})

test('when a delete with an invalid id is made return a message', async () => {
    const returnedNovelties = await Novelty.findAll({ where: {} })
    const expected = { error: 'New not exist' }

    const response = await api
        .delete(`/news/${returnedNovelties[2].dataValues.id + 1}`)
        .expect(400)
    
    expect(response.body).toMatchObject(expected)
    const novelties = await Novelty.findAll({ where: {} })
    const noveltiesAfterDelete = novelties.map(n => n.toJSON())
    expect(noveltiesAfterDelete).toHaveLength(initialNovelties.length)   
})

afterAll(() => {
    db.sequelize.close()
})