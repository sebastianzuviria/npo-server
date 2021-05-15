const db = require('../models/index')
const { Testimonial } = require('../models/index')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

const initialTestimonials = [
    {
        name: 'Testimonial 1',
        content: `Lorem dolor sit amet, consectetur adipiscing elit. Pellentesque vel mi ut
        velit tempor aliquam eget eget enim. Proin cursus eleifend pretium. Aliquam cursus 
        pellentesque interdum. Vivamus placerat id leo a pellentesque. Vivamus a congue urna,
        sed porta eros. Etiam finibus magna et est aliquam, sed semper libero facilisis. 
        Donec lectus lorem, rhoncus vitae quam eget, vulputate gravida elit. Praesent ultricies
        eros id velit condimentum, eu ultrices nisl consequat.`
    },
    {
        name: 'Testimonial 2',
        content: `Lorem dolor sit amet, consectetur adipiscing elit. Pellentesque vel mi ut
        velit tempor aliquam eget eget enim. Proin cursus eleifend pretium. Aliquam cursus 
        pellentesque interdum. Vivamus placerat id leo a pellentesque. Vivamus a congue urna,
        sed porta eros. Etiam finibus magna et est aliquam, sed semper libero facilisis. 
        Donec lectus lorem, rhoncus vitae quam eget, vulputate gravida elit. Praesent ultricies
        eros id velit condimentum, eu ultrices nisl consequat.`
    },
    {
        name: 'Testimonial 3',
        content: `Lorem dolor sit amet, consectetur adipiscing elit. Pellentesque vel mi ut
        velit tempor aliquam eget eget enim. Proin cursus eleifend pretium. Aliquam cursus 
        pellentesque interdum. Vivamus placerat id leo a pellentesque. Vivamus a congue urna,
        sed porta eros. Etiam finibus magna et est aliquam, sed semper libero facilisis. 
        Donec lectus lorem, rhoncus vitae quam eget, vulputate gravida elit. Praesent ultricies
        eros id velit condimentum, eu ultrices nisl consequat.`
    }
]

beforeAll(async () => {
    await db.sequelize.sync({ force: false })
})

beforeEach(async () => {
    await Testimonial.destroy({ where: {}})
    await Testimonial.create(initialTestimonials[0])
    await Testimonial.create(initialTestimonials[1])
    await Testimonial.create(initialTestimonials[2])
})

describe('TESTIMONIAL ENDOPOINT TEST', () => {
    describe('when there is initial some testimonials saved', () => {
        test('testimonials are returned as json', async () => {
            await api
                .get('/testimonials')
                .expect(200)
                .expect('Content-Type', /application\/json/)
        })

        test('id is defined', async () => {
            const response = await api.get('/testimonials')

            const ids = response.body.map(t => t.id)
            expect(ids).toBeDefined()
        })
    })

    describe('GET tests', () => {
        test('all testimonials are returned', async () => {
            const response = await api.get('/testimonials')

            expect(response.body).toHaveLength(initialTestimonials.length)
        })

        test('testimonials are returned by id', async () => {
            const returnedTestimonials = await Testimonial.findAll({ where: {}})
            await api
                .get(`/testimonials/${returnedTestimonials[0].dataValues.id}`)
                .expect(200)
                .expect('Content-Type', /application\/json/)
            await api
                .get(`/testimonials/${returnedTestimonials[1].dataValues.id}`)
                .expect(200)
                .expect('Content-Type', /application\/json/)
            await api
                .get(`/testimonials/${returnedTestimonials[2].dataValues.id}`)
                .expect(200)
                .expect('Content-Type', /application\/json/)
        })

        test('if id not exist, return a status code 404 with message', async () => {
            const returnedTestimonials = await Testimonial.findAll({ where: {} })
            const expected = { error: 'testimonial not exist' }
            const response = await api
                .get(`/testimonials/${returnedTestimonials[2].dataValues.id + 1}`)
                .expect(404)
                .expect('Content-Type', /application\/json/)
            
            expect(response.body).toHaveProperty('error')
            expect(response.body).toMatchObject(expected)   
        })
    })

    describe('POST tests', () => {
        test('a valid testimonial can be added', async () => {
            const newTestimonial = {
                name: 'Testimonial 4',
                content: `Lorem dolor sit amet, consectetur adipiscing elit. Pellentesque vel mi ut
                velit tempor aliquam eget eget enim. Proin cursus eleifend pretium. Aliquam cursus 
                pellentesque interdum. Vivamus placerat id leo a pellentesque. Vivamus a congue urna,
                sed porta eros. Etiam finibus magna et est aliquam, sed semper libero facilisis. 
                Donec lectus lorem, rhoncus vitae quam eget, vulputate gravida elit. Praesent ultricies
                eros id velit condimentum, eu ultrices nisl consequat.`
            }

            await api
                .post('/testimonials')
                .send(newTestimonial)
                .expect(201)
                .expect('Content-Type', /application\/json/)

            const testimonials = await Testimonial.findAll({ where: {}})
            const testimonialsAtEnd = testimonials.map(t => t.toJSON())
    
            expect(testimonialsAtEnd).toHaveLength(initialTestimonials.length + 1)    
        })

        test('name and content must exist to POST', async () => {
            const newTestimonial = {}

            const response = await api
                .post('/testimonials')
                .send(newTestimonial)
                .expect(400)
                .expect('Content-Type', /application\/json/)

            expect(response.body).toHaveProperty('errors')
            expect(response.body.errors).toHaveLength(2)    
            const testimonials = await Testimonial.findAll({ where: {}})
            const testimonialsAtEnd = testimonials.map(t => t.toJSON())

            expect(testimonialsAtEnd).toHaveLength(initialTestimonials.length)
        })

        test('name and content cant be empty to POST', async () => {
            const newTestimonial = {
                name: '',
                content: '',
            }

            const response = await api
                .post('/testimonials')
                .send(newTestimonial)
                .expect(400)
                .expect('Content-Type', /application\/json/)

            expect(response.body).toHaveProperty('errors')
            expect(response.body.errors).toHaveLength(2)    
            const testimonials = await Testimonial.findAll({ where: {}})
            const testimonialsAtEnd = testimonials.map(t => t.toJSON())

            expect(testimonialsAtEnd).toHaveLength(initialTestimonials.length)
        })
    })

    describe('DELETE tests', () => {
        test('delete novelty successfully', async () => {
            const returnedTestimonials = await Testimonial.findAll({ where: {} })

            await api
                .delete(`/testimonials/${returnedTestimonials[0].dataValues.id}`)
                .expect(204)

            const testimonials = await Testimonial.findAll({ where: {} })
            const testimonialsAfterDelete = testimonials.map(t => t.toJSON())
            expect(testimonialsAfterDelete).toHaveLength(initialTestimonials.length - 1)
        })
    })
})

afterAll(() => {
    db.sequelize.close()
})