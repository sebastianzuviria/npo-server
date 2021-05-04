'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Activities', [{
      content: `Lorem dolor sit amet, consectetur adipiscing elit. Pellentesque vel mi ut
      velit tempor aliquam eget eget enim. Proin cursus eleifend pretium. Aliquam cursus 
      pellentesque interdum. Vivamus placerat id leo a pellentesque. Vivamus a congue urna,
      sed porta eros. Etiam finibus magna et est aliquam, sed semper libero facilisis. 
      Donec lectus lorem, rhoncus vitae quam eget, vulputate gravida elit. Praesent ultricies
      eros id velit condimentum, eu ultrices nisl consequat.`,
      image: 'https://www.designevo.com/res/templates/thumb_small/colorful-hand-and-warm-community.png',
      name: 'Activity n1',
      userId: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
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
