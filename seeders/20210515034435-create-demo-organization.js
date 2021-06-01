'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {

    await queryInterface.bulkInsert('Organizations', [{
      name: 'Fundacion Zonas Grises',
      image: 'https://scontent.faep8-1.fna.fbcdn.net/v/t1.6435-9/92017093_118342109815359_3637707720548679680_n.jpg?_nc_cat=103&ccb=1-3&_nc_sid=09cbfe&_nc_ohc=8nxqLt7kqdsAX-L2vNY&_nc_ht=scontent.faep8-1.fna&oh=e00902ef7aefa3a907b58350d75ce6a9&oe=60DB4489',
      phone: '011 15-6233-2380',
      address: 'Av. Almte Brown 1402, Buenos Aires',
      welcomeText:'Bienvenidos a Fundacion Zonas Grises. Aqui podrá comunicarse con nosotros.',
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
