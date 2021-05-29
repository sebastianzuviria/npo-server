'use strict';

const encryptPassword = require('../utils/encrypt');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const userObject = {
      password: await encryptPassword('usuariotest'),
      firstName: '',
      lastName: '',
      email: '',
      roleId: 2,
      image:
        'https://www.designevo.com/res/templates/thumb_small/colorful-hand-and-warm-community.png',
      createdAt: new Date(),
      updatedAt: new Date()
    };
    const adminUsers = [
      {
        ...userObject,
        firstName: 'Emiliano',
        lastName: 'Rivarola',
        roleId: 1,
        email: 'emiliano@email.com'
      },
      {
        ...userObject,
        firstName: 'Franco',
        lastName: 'Baisch',
        roleId: 1,
        email: 'franco@email.com'
      },
      {
        ...userObject,
        firstName: 'Gabriel',
        lastName: 'Gomez',
        roleId: 1,
        email: 'gabriel@email.com'
      },
      {
        ...userObject,
        firstName: 'Jonathan Oscar',
        lastName: 'Molina Gomez',
        roleId: 1,
        email: 'jonathan@email.com'
      },
      {
        ...userObject,
        firstName: 'Nataly Mora',
        lastName: 'Mancera',
        roleId: 1,
        email: 'nataly@email.com'
      },
      {
        ...userObject,
        firstName: 'Sebastian',
        lastName: 'Zuviria',
        roleId: 1,
        email: 'sebastian@email.com'
      },
      {
        ...userObject,
        firstName: 'Hugo',
        lastName: 'Foncea',
        roleId: 1,
        email: 'hugo@email.com'
      },
      {
        ...userObject,
        firstName: 'Ariel',
        lastName: 'Sanchez',
        roleId: 1,
        email: 'ariel@email.com'
      },
      {
        ...userObject,
        firstName: 'Alkemy',
        lastName: 'Labs',
        roleId: 1,
        email: 'alkemy@email.com'
      },
      {
        ...userObject,
        firstName: 'Team27',
        lastName: 'CodeZilla',
        roleId: 1,
        email: 'team27@email.com'
      }
    ];

    const regularUsers = [
      {
        ...userObject,
        firstName: 'Antonio',
        lastName: 'Fernandez',
        email: 'antonio@mail.com'
      },
      {
        ...userObject,
        firstName: 'Jose',
        lastName: 'Schilk',
        email: 'jose@mail.com'
      },
      {
        ...userObject,
        firstName: 'Francisco',
        lastName: 'Moreno',
        email: 'francisco@mail.com'
      },
      {
        ...userObject,
        firstName: 'Juan',
        lastName: 'Navarro',
        email: 'juan@mail.com'
      },
      {
        ...userObject,
        firstName: 'Manuel',
        lastName: 'Garcia',
        email: 'manuel@mail.com'
      },
      {
        ...userObject,
        firstName: 'Maria',
        lastName: 'Serrano',
        email: 'maria@mail.com'
      },
      {
        ...userObject,
        firstName: 'Josefa',
        lastName: 'Ruiz',
        email: 'josefa@mail.com'
      },
      {
        ...userObject,
        firstName: 'Isabel',
        lastName: 'Diaz',
        email: 'isabel@mail.com'
      },
      {
        ...userObject,
        firstName: 'Noemi',
        lastName: 'Romero',
        email: 'noemi@mail.com'
      },
      {
        ...userObject,
        firstName: 'Lucia',
        lastName: 'Saez',
        email: 'lucia@mail.com'
      }
    ];
    await queryInterface.bulkDelete('Users', {});
    await queryInterface.bulkInsert('Users', [...adminUsers, ...regularUsers]);
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
