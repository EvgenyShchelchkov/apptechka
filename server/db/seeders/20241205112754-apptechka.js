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
				img: 'img_medkits/first_kit.jpg',
			},
			{
				name: 'Для машины',
				user_id: 1,
				img: 'img_medkits/first_kit.jpg',
			},
			{
				name: 'В путешествие',
				user_id: 1,
				img: 'img_medkits/first_kit.jpg',
			},
		]);
		await queryInterface.bulkInsert('Medicines', [
			{
				name: 'Ибупрофен',
				description:
					'Противовоспалительное, жаропонижающее и обезболивающее средство.',
				code: 'IBP001',
				img: 'img_medicines/1.avif',
				presciption: 'Без рецепта',
				category: 'Обезболивающие',
			},
			{
				name: 'Анальгин',
				description:
					'Обезболивающее средство для снятия боли различного происхождения.',
				code: 'ANL002',
				img: 'img_medicines/2.avif',
				presciption: 'Без рецепта',
				category: 'Обезболивающие',
			},
			{
				name: 'Парацетамол',
				description:
					'Противовоспалительное средство, жаропонижающее и обезболивающее.',
				code: 'PARA003',
				img: 'img_medicines/3.avif',
				presciption: 'Без рецепта',
				category: 'Обезболивающие',
			},
			{
				name: 'Амоксициллин',
				description: 'Антибиотик для лечения инфекций, вызванных бактериями.',
				code: 'AMX004',
				img: 'img_medicines/4.avif',
				presciption: 'По рецепту',
				category: 'Антибиотики',
			},
			{
				name: 'Цефтриаксон',
				description: 'Антибиотик широкого спектра действия.',
				code: 'CFT005',
				img: 'img_medicines/5.avif',
				presciption: 'По рецепту',
				category: 'Антибиотики',
			},
			{
				name: 'Левофлоксацин',
				description:
					'Антибактериальный препарат, применяемый для лечения бактериальных инфекций.',
				code: 'LEV006',
				img: 'img_medicines/6.avif',
				presciption: 'По рецепту',
				category: 'Антибиотики',
			},
			{
				name: 'Ношпа',
				description:
					'Противоспазматическое средство, которое помогает при болях в животе.',
				code: 'NOS007',
				img: 'img_medicines/7.avif',
				presciption: 'Без рецепта',
				category: 'Противоспазматические',
			},
			{
				name: 'Дротаверин',
				description:
					'Противоспазматическое средство для снятия болей в желудочно-кишечном тракте.',
				code: 'DRT008',
				img: 'img_medicines/8.avif',
				presciption: 'Без рецепта',
				category: 'Противоспазматические',
			},
			{
				name: 'Фенистил',
				description:
					'Антигистаминное средство, применяемое при аллергических реакциях.',
				code: 'FNS009',
				img: 'img_medicines/9.avif',
				presciption: 'Без рецепта',
				category: 'Противоаллергические',
			},
			{
				name: 'Супрастин',
				description:
					'Антигистаминное средство для лечения аллергических заболеваний.',
				code: 'SPR010',
				img: 'img_medicines/10.avif',
				presciption: 'Без рецепта',
				category: 'Противоаллергические',
			},
			{
				name: 'Кетопрофен',
				description:
					'Противовоспалительное и обезболивающее средство, применяемое при болях.',
				code: 'KTP011',
				img: 'img_medicines/11.avif',
				presciption: 'Без рецепта',
				category: 'Обезболивающие',
			},
			{
				name: 'Ципрофлоксацин',
				description:
					'Антибиотик для лечения инфекций, вызванных чувствительными бактериями.',
				code: 'CIP012',
				img: 'img_medicines/12.avif',
				presciption: 'По рецепту',
				category: 'Антибиотики',
			},
			{
				name: 'Метоклопрамид',
				description: 'Препарат для лечения тошноты и рвоты.',
				code: 'MET013',
				img: 'img_medicines/13.avif',
				presciption: 'Без рецепта',
				category: 'Противорвотные',
			},
			{
				name: 'Дексаметазон',
				description:
					'Кортикостероид, используемый для лечения воспалительных заболеваний.',
				code: 'DEX014',
				img: 'img_medicines/14.avif',
				presciption: 'По рецепту',
				category: 'Кортикостероиды',
			},
			{
				name: 'Лоратадин',
				description: 'Антигистаминное средство для лечения аллергии.',
				code: 'LOR015',
				img: 'img_medicines/15.avif',
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
		await queryInterface.bulkInsert('Favorites', [
			{
				user_id: 1,
				medicine_instance_id: 1,
			},
			{
				user_id: 1,
				medicine_instance_id: 2,
			},
			{
				user_id: 1,
				medicine_instance_id: 3,
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
