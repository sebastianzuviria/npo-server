const { Category } = require('../models/index');

module.exports = {
    getCategories: async (req, res) => {
        try {
            const categoriesList = await Category.findAll();

            if (categoriesList.length === 0) {
                res.status(404).json({
                    error: 'Sorry, there are not categories'
                })
            }
            else {
                res.status(200).json(categoriesList)
            }
        } 
        catch (error) {
            res.status(400).json({ error: error.message });
        }
    },
    
    createCategory: async (req, res) => {
        const body = req.body;

        try {
            // Verificar si la nueva categoria ya existe
            const existingCategory = await Category.findOne({ where: { name: body.name } });

            if (!existingCategory) {
                const newCategory = await Category.create({
                    name: body.name,
                    description: body.description
                });

                res.status(201).json(newCategory);
            }
            else {
                res.status(409).json({
                    message: 'That category already exists'
                })
            }
        } 
        catch (error) {
            res.status(400).json({ error: error.message });
        }
    },

    updateCategory: async (req, res) => {
        const id = req.params.id
        const body = req.body
        
        try {
            const isUpdatedCategory = await Category.update({
                name: body.name,
                description: body.description
            }, { where: { id: id } })

            if(isUpdatedCategory[0] === 1) {
                const updatedCategory = await Category.findByPk(id)
                res.status(200).json(updatedCategory)
            } else {
                res.status(404).json({ error: 'Category not exist'})
            }
        } catch (error) {
            res.status(400).json({ error: error.message })
        }
    },
    deleteCategory: async(req,res) => {
        try {

            const categorydelete= await Category.destroy({ where: { id: req.params.id } });
            if(categorydelete){
                return res.status(200).json({ message: 'Category deleted successfuly' });
            }
            else{
                return res.status(404).json({ message: 'Category not found' });

            }
        } catch (error) {
            res.status(500).send(error.message);
        }
    }
}