'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      'Categories',
      [
        {
            id: 1,
            name: 'categoria 1',
            description: 'categoria 1 categoria de prueba',
            createdAt: new Date(),
            updatedAt: new Date()
        },
        {   
            id: 2,
            name: 'categoria 2',
            description: 'categoria 2 categoria de prueba',
            createdAt: new Date(),
            updatedAt: new Date()
        },
        {
            id: 3,
            name: 'categoria 3',
            description: 'categoria 3 categoria de prueba',
            createdAt: new Date(),
            updatedAt: new Date()
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};