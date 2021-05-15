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
    
})