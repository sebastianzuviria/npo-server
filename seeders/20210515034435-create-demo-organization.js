'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {

    await queryInterface.bulkInsert('Organizations', [{
      name: 'Name Organization',
      image: 'imagen.jpg',
      phone: '1234567',
      address: 'Cll ...',
      welcomeText:'Info Organization',
      createdAt: new Date(),
      updatedAt: new Date()
    }])

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
