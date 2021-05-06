const { body } = require('express-validator');
const { Category } = require('../models/index')


const noveltyValidation = [
    body('title').not().isEmpty().trim(),
    body('image').not().isEmpty().trim(),
    body('content').not().isEmpty().trim(),
    body('category').not().isEmpty().trim()
    // body('category').custom(async (category) => {
    //     const returnedCategory = await Category.findOne({ where: { name: category}})
    //       if (!returnedCategory) {
    //         throw new Error('Category not exist');
    //       }
    //       return true
    //     })
];

module.exports = noveltyValidation;