const { body } = require('express-validator');
//const { Category } = require('../models/index')


const noveltyValidation = [
    body('title', 'title not valid').exists({ checkNull: true }).isLength({ min: 1 }),
    body('image', 'image not valid').exists({ checkNull: true }).isLength({ min: 1 }),
    body('content', 'content not valid').exists({ checkNull: true }).isLength({ min: 1 }),
    body('category', 'category not valid').exists({ checkNull: true }).isLength({ min: 1 })
    // body('category').custom(async (category) => {
    //     const returnedCategory = await Category.findOne({ where: { name: category}})
    //       if (!returnedCategory) {
    //         throw new Error('Category not exist');
    //       }
    //       return true
    //     })
];

module.exports = noveltyValidation;