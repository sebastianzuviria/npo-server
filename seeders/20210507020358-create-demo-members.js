'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Members', [{
      name: 'ari',
      image: 'imagen.jpg',
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      name: 'seba',
      image: 'imagen.jpg',
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      name: 'jona',
      image: 'imagen.jpg',
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      name: 'hugo',
      image: 'imagen.jpg',
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      name: 'gaby',
      image: 'imagen.jpg',
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      name: 'nati',
      image: 'imagen.jpg',
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      name: 'bruno',
      image: 'imagen.jpg',
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      name: 'franco',
      image: 'imagen.jpg',
      createdAt: new Date(),
      updatedAt: new Date()
    }],{});
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
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
