'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      'Novelties',
      [
        {
          title: 'News 1',
          image: 'image.jpg',
          type: 'news',
          content: `Lorem dolor sit amet, consectetur adipiscing elit. Pellentesque vel mi ut
      velit tempor aliquam eget eget enim. Proin cursus eleifend pretium. Aliquam cursus 
      pellentesque interdum. Vivamus placerat id leo a pellentesque. Vivamus a congue urna,
      sed porta eros. Etiam finibus magna et est aliquam, sed semper libero facilisis. 
      Donec lectus lorem, rhoncus vitae quam eget, vulputate gravida elit. Praesent ultricies
      eros id velit condimentum, eu ultrices nisl consequat.`,
          categoryId: 1,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
            title: 'News 2',
            image: 'image2.jpg',
            type: 'news',
            content: `Lorem dolor sit amet, consectetur adipiscing elit. Pellentesque vel mi ut
        velit tempor aliquam eget eget enim. Proin cursus eleifend pretium. Aliquam cursus 
        pellentesque interdum. Vivamus placerat id leo a pellentesque. Vivamus a congue urna,
        sed porta eros. Etiam finibus magna et est aliquam, sed semper libero facilisis. 
        Donec lectus lorem, rhoncus vitae quam eget, vulputate gravida elit. Praesent ultricies
        eros id velit condimentum, eu ultrices nisl consequat.`,
            categoryId: 2,
            createdAt: new Date(),
            updatedAt: new Date()
          },
          {
            title: 'News 3',
            image: 'image3.jpg',
            type: 'news',
            content: `Lorem dolor sit amet, consectetur adipiscing elit. Pellentesque vel mi ut
        velit tempor aliquam eget eget enim. Proin cursus eleifend pretium. Aliquam cursus 
        pellentesque interdum. Vivamus placerat id leo a pellentesque. Vivamus a congue urna,
        sed porta eros. Etiam finibus magna et est aliquam, sed semper libero facilisis. 
        Donec lectus lorem, rhoncus vitae quam eget, vulputate gravida elit. Praesent ultricies
        eros id velit condimentum, eu ultrices nisl consequat.`,
            categoryId: 3,
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
