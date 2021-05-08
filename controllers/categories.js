'use-strict'

// Model
const { Category } = require('../models/index');

module.exports = {
    getCategories: async (req, res) => {
        try {
            let categoriesList = await Category.findAll();

            if (categoriesList.length === 0) {
                res.status(404).json({
                    'message': 'Sorry, there are no categories'
                })
            }
            else {
                res.status(200).json({
                    'categories': categoriesList
                })
            }
        } 
        catch (error) {
            res.status(500).json({
                'message': 'Category not found',
                'error': error.message
            });
        }
    }
}