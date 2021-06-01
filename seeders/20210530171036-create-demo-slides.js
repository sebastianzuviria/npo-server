'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.bulkInsert(
            'Slides',
            [
                {
                    imageUrl:
                        'https://images.pexels.com/photos/6646917/pexels-photo-6646917.jpeg',
                    text: 'Acción Social',
                    order: '1',
                    organizationId: 1,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    imageUrl:
                        'https://images.pexels.com/photos/6994964/pexels-photo-6994964.jpeg',
                    text: 'Donaciones',
                    order: '2',
                    organizationId: 1,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    imageUrl:
                        'https://images.pexels.com/photos/6646818/pexels-photo-6646818.jpeg',
                    text: 'Solidaridad',
                    order: '3',
                    organizationId: 1,
                    createdAt: new Date(),
                    updatedAt: new Date(),
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
    },
};
