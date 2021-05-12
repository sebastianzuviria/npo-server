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
    },
    createCategory: async (req, res) => {
        const body = req.body;

        try {
            // Verificar si la nueva categoria ya existe
            let existingCategory = await Category.findOne({ where: { name: body.name } });

            if (!existingCategory) {
                let newCategory = await Category.create({
                    name: body.name,
                    description: body.description
                });

                res.status(201).json({
                    'message': 'New category created successfully',
                    'newCategory': newCategory
                });
            }
            else {
                res.status(409).json({
                    'message': 'That category already exists'
                })
            }
        } 
        catch (error) {
            res.status(500).json({
                'message': 'Category not created',
                'error': error
            });
        }
    },
    deleteCategory: async(req,res) => {
        try {

            await Category.destroy({ where: { id: req.params.id } });
            return res.status(200).json({ message: 'Category deleted successfuly' });
        } catch (error) {
            res.status(400).send(error.message);
        }
    }
}