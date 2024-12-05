'use strict';

const bcrypt = require('bcrypt');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Users', [
      {
        name: 'alex',
        email: 'alex@gmail.com',
        password: await bcrypt.hash('123', 10),
      },
    ]);

    await queryInterface.bulkInsert('MedKits', [
      {
        name: 'Для дома',
        user_id: 1,
      },
      {
        name: 'Для машины',
        user_id: 1,
      },
      {
        name: 'В путешествие',
        user_id: 1,
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
