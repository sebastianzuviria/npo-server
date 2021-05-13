const db = require('../models/index');
const { Activity } = require('../models/index');

const supertest = require('supertest');
const app = require('../app');
const apiTest = supertest(app);


// Set initial activities
const initialActivity = [
    {
        content: 'Lorem dolor sit amet, consectetur adipiscing elit. Pellentesque vel mi ut velit tempor Proin cursus eleifend pretium.',
        image: 'https://www.designevo.com/res/templates/thumb_small/colorful-hand-and-warm-community.png',
        name: 'Activity n2',
        userId: 1
    },
    {
        content: 'Lorem dolor sit amet, consectetur adipiscing elit. Pellentesque vel mi ut velit tempor Proin cursus eleifend pretium.',
        image: 'https://www.designevo.com/res/templates/thumb_small/colorful-hand-and-warm-community.png',
        name: 'Activity n3',
        userId: 1
    },

];

// Clean DB and add initialActivities before run all tests
beforeAll( async () => {

    try {

        await db.sequelize.sync({ force: false });
        await Activity.destroy({ where: {}})
    
        initialActivity.map( async (data) => {
        await Activity.create(data);
    });
        
    } catch (err) {
        res.status(400).send(err.message);
    }
    
});

describe('Activities endpoint tests', () => {

    it("Get /activities as JSON", async () => {

        await apiTest
            .get('/activities')
            .expect('Content-Type', /json/)
            .expect(200);

    });

    it("Get all /activities", async () => {

        const res = await apiTest.get('/activities');
        expect(res.body).toHaveLength(initialActivity.length);

    });

    it("Get activities by id", async () => {

        initialActivity.map( async (data) => {

            const res = await apiTest.get(`/activities/${ data.id }`);
            expect(() => res.body.id === initialActivity[0].id);
        })

    });
    
});

// Close sequelize connection after run all tests
afterAll(() => {
    db.sequelize.close()
});