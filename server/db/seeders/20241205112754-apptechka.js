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
    await queryInterface.bulkInsert('Medicines', [
      {
        name: 'Ибупрофен',
        description: 'Противовоспалительное, жаропонижающее и обезболивающее средство.',
        code: 'IBP001',
        img: 'ibuprofen.jpg',
        presciption: 'Без рецепта',
        category: 'Обезболивающие',
      },
      {
        name: 'Анальгин',
        description: 'Обезболивающее средство для снятия боли различного происхождения.',
        code: 'ANL002',
        img: 'analgin.jpg',
        presciption: 'Без рецепта',
        category: 'Обезболивающие',
      },
      {
        name: 'Парацетамол',
        description: 'Противовоспалительное средство, жаропонижающее и обезболивающее.',
        code: 'PARA003',
        img: 'paracetamol.jpg',
        presciption: 'Без рецепта',
        category: 'Обезболивающие',
      },
      {
        name: 'Амоксициллин',
        description: 'Антибиотик для лечения инфекций, вызванных бактериями.',
        code: 'AMX004',
        img: 'amoxicillin.jpg',
        presciption: 'По рецепту',
        category: 'Антибиотики',
      },
      {
        name: 'Цефтриаксон',
        description: 'Антибиотик широкого спектра действия.',
        code: 'CFT005',
        img: 'ceftriaxone.jpg',
        presciption: 'По рецепту',
        category: 'Антибиотики',
      },
      {
        name: 'Левофлоксацин',
        description: 'Антибактериальный препарат, применяемый для лечения бактериальных инфекций.',
        code: 'LEV006',
        img: 'levofloxacin.jpg',
        presciption: 'По рецепту',
        category: 'Антибиотики',
      },
      {
        name: 'Ношпа',
        description: 'Противоспазматическое средство, которое помогает при болях в животе.',
        code: 'NOS007',
        img: 'no-shpa.jpg',
        presciption: 'Без рецепта',
        category: 'Противоспазматические',
      },
      {
        name: 'Дротаверин',
        description: 'Противоспазматическое средство для снятия болей в желудочно-кишечном тракте.',
        code: 'DRT008',
        img: 'drotaverin.jpg',
        presciption: 'Без рецепта',
        category: 'Противоспазматические',
      },
      {
        name: 'Фенистил',
        description: 'Антигистаминное средство, применяемое при аллергических реакциях.',
        code: 'FNS009',
        img: 'fenistil.jpg',
        presciption: 'Без рецепта',
        category: 'Противоаллергические',
      },
      {
        name: 'Супрастин',
        description: 'Антигистаминное средство для лечения аллергических заболеваний.',
        code: 'SPR010',
        img: 'suprastin.jpg',
        presciption: 'Без рецепта',
        category: 'Противоаллергические',
      },
    ]);
    await queryInterface.bulkInsert('MedicineInstances', [
      {
        quantity: 10,
        expiration: new Date('2025-12-31'),
        medicine_id: 1,
        med_kit_id: 1,
      },
      {
        quantity: 5,
        expiration: new Date('2026-06-30'),
        medicine_id: 2,
        med_kit_id: 1,
      },
      {
        quantity: 3,
        expiration: new Date('2027-03-15'),
        medicine_id: 1,
        med_kit_id: 2,
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
