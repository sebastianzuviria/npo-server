'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Members', [{
      name: 'Ari',
      image: 'https://ong-team-27.s3-sa-east-1.amazonaws.com/114.jpg',
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      name: 'Seba',
      image: 'https://ong-team-27.s3-sa-east-1.amazonaws.com/112.png',
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      name: 'Jona',
      image: 'https://ong-team-27.s3-sa-east-1.amazonaws.com/111.png',
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      name: 'Gaby',
      image: 'https://ong-team-27.s3-sa-east-1.amazonaws.com/107.jpg',
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      name: 'Nati',
      image: 'https://ong-team-27.s3-sa-east-1.amazonaws.com/109.jpg',
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      name: 'Franco',
      image: 'https://ong-team-27.s3-sa-east-1.amazonaws.com/108.jpg',
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      name: 'Emi',
      image: 'https://ong-team-27.s3-sa-east-1.amazonaws.com/134.jpeg',
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
