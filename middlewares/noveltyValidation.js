const { body } = require('express-validator');
//const { Category } = require('../models/index')


const noveltyValidation = [
    body('title', 'title must exist').exists({ checkNull: true }),
    body('title', 'title not be empty').notEmpty(),
    body('image', 'image not valid').exists({ checkNull: true }),
    body('image', 'image not be empty').notEmpty(),
    body('content', 'content not valid').exists({ checkNull: true }),
    body('content', 'content not be empty').notEmpty(),
    body('category', 'category not valid').exists({ checkNull: true }),
    body('category', 'category not be empty').notEmpty(),
    // body('category').custom(async (category) => {
    //     const returnedCategory = await Category.findOne({ where: { name: category}})
    //       if (!returnedCategory) {
    //         throw new Error('Category not exist');
    //       }
    //       return true
    //     })
];

module.exports = noveltyValidation;