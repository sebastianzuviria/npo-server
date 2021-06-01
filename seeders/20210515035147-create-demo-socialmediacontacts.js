'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {

    await queryInterface.bulkInsert('Socialmediacontacts', [{
      facebook: 'https://www.facebook.com/fundacionzonasgrises',
      instagram: 'https://www.instagram.com/fundacionzonasgrises/?hl=es',
      linkedin: 'https://www.linkedin.com/',
      organizationId: 1,
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
