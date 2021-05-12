const db = require('../models/index')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

beforeAll(async () => {
    await db.sequelize.sync({ force: true })
})

test('root', async () => {
    await api
        .get('/')
        .expect(200)
})

afterAll(() => {
    db.sequelize.close()
})