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

    updateCategory: async (request, response) => {
        const id = request.params.id
        const body = request.body
        
        try {
            const isUpdatedCategory = await Category.update({
                name: body.name,
                description: body.description
            }, { where: { id: id } })

            if(isUpdatedCategory[0] === 1) {
                const updatedCategory = await Category.findByPk(id)
                response.status(200).json(updatedCategory)
            } else {
                response.status(404).json({ error: 'Category not exist'})
            }
        } catch (error) {
            response.status(400).json({ error: error.message })
        }
    }
}