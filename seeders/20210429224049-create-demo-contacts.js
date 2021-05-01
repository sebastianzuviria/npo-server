'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      'Contacts',
      [
        {
          name: 'Nombre Falso',
          phone: '11 31344422',
          email: 'falso@falso.com',
          message: `Lorem dolor sit amet, consectetur adipiscing elit. Pellentesque vel mi ut
      velit tempor aliquam eget eget enim. Proin cursus eleifend pretium. Aliquam cursus 
      pellentesque interdum. Vivamus placerat id leo a pellentesque. Vivamus a congue urna,
      sed porta eros. Etiam finibus magna et est aliquam, sed semper libero facilisis. 
      Donec lectus lorem, rhoncus vitae quam eget, vulputate gravida elit. Praesent ultricies
      eros id velit condimentum, eu ultrices nisl consequat.`,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'Batman',
          phone: '11 99882288',
          email: 'batman@baticueva.com',
          message: `Lorem dolor sit amet, consectetur adipiscing elit. Pellentesque vel mi ut
      velit tempor aliquam eget eget enim. Proin cursus eleifend pretium. Aliquam cursus 
      pellentesque interdum. Vivamus placerat id leo a pellentesque. Vivamus a congue urna,
      sed porta eros. Etiam finibus magna et est aliquam, sed semper libero facilisis. 
      Donec lectus lorem, rhoncus vitae quam eget, vulputate gravida elit. Praesent ultricies
      eros id velit condimentum, eu ultrices nisl consequat.`,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'Bitbucket',
          phone: '11 22762961',
          email: 'git@bucket.com',
          message: `Lorem dolor sit amet, consectetur adipiscing elit. Pellentesque vel mi ut
      velit tempor aliquam eget eget enim. Proin cursus eleifend pretium. Aliquam cursus 
      pellentesque interdum. Vivamus placerat id leo a pellentesque. Vivamus a congue urna,
      sed porta eros. Etiam finibus magna et est aliquam, sed semper libero facilisis. 
      Donec lectus lorem, rhoncus vitae quam eget, vulputate gravida elit. Praesent ultricies
      eros id velit condimentum, eu ultrices nisl consequat.`,
          createdAt: new Date(),
          updatedAt: new Date()
        }
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
