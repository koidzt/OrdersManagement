'use strict';

const { Owner } = require('../models');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const owner1 = await Owner.findOne({ where: { id_card: '144445555221' } });
    const owner2 = await Owner.findOne({ where: { id_card: '1222233333445' } });
    const owner3 = await Owner.findOne({ where: { id_card: '3333333333333' } });
    const owner4 = await Owner.findOne({ where: { id_card: '2222222222222' } });
    const owner5 = await Owner.findOne({ where: { id_card: '1111111111111' } });
    return queryInterface.bulkInsert('owner_addresses', [
      {
        owner_id: owner1.id,
        address: '111 ถ.',
        subdistrict: 'แขวง',
        district: 'เขต',
        province: 'กทม.',
        zip_code: '10000',
      },
      {
        owner_id: owner2.id,
        address: '222 ถ.',
        subdistrict: 'ต.',
        district: 'อ.',
        province: 'จ. สมุทรปราการ',
        zip_code: '53000',
      },
      {
        owner_id: owner3.id,
        address: '333 ถ.',
        subdistrict: 'ต.',
        district: 'อ.',
        province: 'จ. นนทบุรี',
        zip_code: '10500',
      },
      {
        owner_id: owner4.id,
        address: '44/4 ถ.',
        subdistrict: 'ต.',
        district: 'อ.',
        province: 'จ. ปทุมธานี',
        zip_code: '10230',
      },
      {
        owner_id: owner5.id,
        address: '261/38 ถ.',
        subdistrict: 'แขวง',
        district: 'เขต',
        province: 'กทม',
        zip_code: '10500',
      },
    ]);
  },
  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('owner_addresses');
  },
};
