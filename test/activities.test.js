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
        userId: 1,
    },
    {
        content: 'Lorem dolor sit amet, consectetur adipiscing elit. Pellentesque vel mi ut velit tempor Proin cursus eleifend pretium.',
        image: 'https://www.designevo.com/res/templates/thumb_small/colorful-hand-and-warm-community.png',
        name: 'Activity n3',
        userId: 1,
    },
];

// Clean DB and add initialActivities before run all tests
beforeAll(async () => {

    try {
        await db.sequelize.sync({ force: false });
        await Activity.destroy({ where: {} });

        initialActivity.map(async (data) => {
            await Activity.create(data);
        });
    } catch (err) {
        console.log(err);
    }

});

describe('Activities endpoint tests', () => {

    it('(GET) as JSON', async () => {
        await apiTest
            .get('/activities')
            .expect('Content-Type', /json/)
            .expect(200);

    });

    it('(GET) all', async () => {

        const res = await apiTest.get('/activities');
        expect(res.body).toHaveLength(initialActivity.length);

    });

    it('(GET) by id', async () => {

        const res = await Activity.findAll({ where: {} });

        res.map(async (data) => {
            await apiTest
                .get(`/activities/${data.id}`)
                .expect(200)
                .expect('Content-Type', /json/);
        });
    });

    it('(GET) must fail if ID doesn\'t exists', async () => {

        const res = await Activity.findAll({ where: {} });

        await apiTest
            .get(`/activities/${res[res.length - 1].dataValues.id + 1}`)
            .expect(400)
            .expect('Content-Type', /json/);
    });

    it('(POST) new activity', async () => {

        const { content, image, userId } = initialActivity[0];

        await apiTest
            .post('/activities')
            .send({ content, image, userId, name: 'Activity n4' })
            .expect(200);
    });

    it('(POST) must fail if a field is empty', async () => {

        const { content, image } = initialActivity[0];

        await apiTest.post('/activities').send({ content, image }).expect(400);
    });

    it('(PUT) /activities', async () => {

        const res = await Activity.findAll({ limit: 1, where: {} });

        await apiTest
            .put(`/activities/${res[0].dataValues.id}`)
            .send({ content: 'Content Content', name: 'Edited Activity', userId: 1 })
            .expect(200);
    });

    it('(PUT) must fail if ID doesn\'t exists', async () => {

        const res = await Activity.findAll({ where: {} });

        await apiTest
            .put(`/activities/${res[res.length - 1].dataValues.id + 1}`)
            .send({ content: 'Content Content', name: 'Edited Activity' })
            .expect(400);
    });

    it('(PUT) must fail if a field is empty', async () => {

        const res = await Activity.findAll({ limit: 1, where: {} });

        await apiTest
            .put(`/activities/${res[0].dataValues.id}`)
            .send({ content: '', name: '' })
            .expect(400);
    });

    it("(DELETE) by ID", async () => {
        
        const res = await Activity.findAll({ where: {} });

        await apiTest
            .delete(`/activities/${res[0].dataValues.id}`)
                .expect(200);
    });

    it('(DELETE) must fail if ID doesn\'t exists', async () => {

        const res = await Activity.findAll({where: {}, order: [ [ 'id', 'DESC' ]]});

        await apiTest
            .delete(`/activities/${ res[0].dataValues.id + 1 }`)
            .expect(400)

    });
});

// Close sequelize connection after run all tests
afterAll(() => {

    db.sequelize.close();

});
