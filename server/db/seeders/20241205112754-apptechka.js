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
        img: 'https://img.freepik.com/free-photo/medications-pink_1150-13885.jpg?t=st=1733490251~exp=1733493851~hmac=46d148f9fcc083715b816ccbda745f0bfb7579515119bdc229b59cff693201a7&w=740',
        presciption: 'Без рецепта',
        category: 'Обезболивающие',
      },
      {
        name: 'Анальгин',
        description: 'Обезболивающее средство для снятия боли различного происхождения.',
        code: 'ANL002',
        img: 'https://img.freepik.com/free-photo/top-view-variety-medicine-with-copy-space_23-2148529783.jpg?t=st=1733492196~exp=1733495796~hmac=c0ca7180ba9ee8c2e9c4af37f9783dc80c6e589e7664c96ded17ae4a97646f17&w=1800',
        presciption: 'Без рецепта',
        category: 'Обезболивающие',
      },
      {
        name: 'Парацетамол',
        description: 'Противовоспалительное средство, жаропонижающее и обезболивающее.',
        code: 'PARA003',
        img: 'https://img.freepik.com/free-photo/assortment-colorful-pills_144627-33882.jpg?t=st=1733490361~exp=1733493961~hmac=1f956922470673cafb70e3fa8b27acb929cb04c48adbceeb6c3cc7693039090b&w=740',
        presciption: 'Без рецепта',
        category: 'Обезболивающие',
      },
      {
        name: 'Амоксициллин',
        description: 'Антибиотик для лечения инфекций, вызванных бактериями.',
        code: 'AMX004',
        img: 'https://img.freepik.com/free-photo/white-pills-frame-with-copy-space_23-2148506703.jpg?t=st=1733490405~exp=1733494005~hmac=07091a6aa19a3b9fc080fe123fd39455253ddcc735ae0fa48463605c9e60b56b&w=740',
        presciption: 'По рецепту',
        category: 'Антибиотики',
      },
      {
        name: 'Цефтриаксон',
        description: 'Антибиотик широкого спектра действия.',
        code: 'CFT005',
        img: 'https://img.freepik.com/free-photo/top-view-world-science-day-arrangement-with-pills_23-2149112656.jpg?t=st=1733490441~exp=1733494041~hmac=9f83588ef43f67ba81ed4bee3f156b56b51aadf1a11bcc012d86d555fec01bd6&w=740',
        presciption: 'По рецепту',
        category: 'Антибиотики',
      },
      {
        name: 'Левофлоксацин',
        description: 'Антибактериальный препарат, применяемый для лечения бактериальных инфекций.',
        code: 'LEV006',
        img: 'https://img.freepik.com/free-photo/top-view-covid-vaccine-inside-little-flask-with-pills-red-background_179666-17403.jpg?t=st=1733490493~exp=1733494093~hmac=5e8eed0a204dbee08ed4c4b811f91b2661e6bc9c3dd1a1021b24dd15ccdf560d&w=740',
        presciption: 'По рецепту',
        category: 'Антибиотики',
      },
      {
        name: 'Ношпа',
        description: 'Противоспазматическое средство, которое помогает при болях в животе.',
        code: 'NOS007',
        img: 'https://img.freepik.com/free-photo/high-angle-container-with-pills-copy-space_23-2148530998.jpg?t=st=1733490520~exp=1733494120~hmac=f5af98b862e9a3929c1bf0ec5d1b78a70a1ce1abd7009b1bf1a79daf12391082&w=740',
        presciption: 'Без рецепта',
        category: 'Противоспазматические',
      },
      {
        name: 'Дротаверин',
        description: 'Противоспазматическое средство для снятия болей в желудочно-кишечном тракте.',
        code: 'DRT008',
        img: 'https://img.freepik.com/premium-photo/flat-lay-pills-frame-with-copy-space_23-2148538270.jpg?w=1060',
        presciption: 'Без рецепта',
        category: 'Противоспазматические',
      },
      {
        name: 'Фенистил',
        description: 'Антигистаминное средство, применяемое при аллергических реакциях.',
        code: 'FNS009',
        img: 'https://img.freepik.com/premium-photo/high-angle-view-blue-buttons-table_1048944-21772908.jpg?w=1060',
        presciption: 'Без рецепта',
        category: 'Противоаллергические',
      },
      {
        name: 'Супрастин',
        description: 'Антигистаминное средство для лечения аллергических заболеваний.',
        code: 'SPR010',
        img: 'https://img.freepik.com/premium-photo/yellow-pills-scattered-from-glass-jar-white_76263-708.jpg?w=1060',
        presciption: 'Без рецепта',
        category: 'Противоаллергические',
      },
      {
        name: 'Кетопрофен',
        description: 'Противовоспалительное и обезболивающее средство, применяемое при болях.',
        code: 'KTP011',
        img: 'https://img.freepik.com/premium-photo/bottle-scattered-pills-color-background-top-view-space-text_1305425-8544.jpg?w=1060',
        presciption: 'Без рецепта',
        category: 'Обезболивающие',
      },
      {
        name: 'Ципрофлоксацин',
        description: 'Антибиотик для лечения инфекций, вызванных чувствительными бактериями.',
        code: 'CIP012',
        img: 'https://img.freepik.com/free-photo/high-angle-mug-with-multiple-pills_23-2148530999.jpg?t=st=1733490318~exp=1733493918~hmac=948ed3024e65845ba0b6fccbc6d5dee10fb1701cec6d21a92a9468c56a62e758&w=740',
        presciption: 'По рецепту',
        category: 'Антибиотики',
      },
      {
        name: 'Метоклопрамид',
        description: 'Препарат для лечения тошноты и рвоты.',
        code: 'MET013',
        img: 'https://img.freepik.com/free-photo/pills-out-from-bottle_144627-33887.jpg?t=st=1733490726~exp=1733494326~hmac=3ddcfb849c9fc5a7438e2ef61002bba77e863ac8dcafc572598224a32da475ec&w=1800',
        presciption: 'Без рецепта',
        category: 'Противорвотные',
      },
      {
        name: 'Дексаметазон',
        description: 'Кортикостероид, используемый для лечения воспалительных заболеваний.',
        code: 'DEX014',
        img: 'https://img.freepik.com/premium-photo/flat-lay-macro-blister-capsule-pills-tablets-top-view_120485-10347.jpg?w=740',
        presciption: 'По рецепту',
        category: 'Кортикостероиды',
      },
      {
        name: 'Лоратадин',
        description: 'Антигистаминное средство для лечения аллергии.',
        code: 'LOR015',
        img: 'https://img.freepik.com/premium-photo/white-medical-pills-two-color-red-blue-background_127657-11241.jpg?w=1800',
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
