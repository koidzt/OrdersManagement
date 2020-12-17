'use strict';

const { Customer } = require('../models');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const customer1 = await Customer.findOne({ where: { name: 'Customer1' } });
    const customer2 = await Customer.findOne({ where: { name: 'Customer2' } });
    const customer3 = await Customer.findOne({ where: { name: 'Customer3' } });
    const customer4 = await Customer.findOne({ where: { name: 'Customer4' } });
    const customer5 = await Customer.findOne({ where: { name: 'Customer5' } });

    return queryInterface.bulkInsert('customer_addresses', [
      {
        customer_id: customer1.id,
        address: '111 ถ.',
        subdistrict: 'แขวง',
        district: 'เขต',
        province: 'กทม.',
        zip_code: '10000',
      },
      {
        customer_id: customer2.id,
        address: '222 ถ.',
        subdistrict: 'ต.',
        district: 'อ.',
        province: 'จ. สมุทรปราการ',
        zip_code: '53000',
      },
      {
        customer_id: customer3.id,
        address: '321 ถ.',
        subdistrict: 'ต.',
        district: 'อ.',
        province: 'จ. นนทบุรี',
        zip_code: '10500',
      },
      {
        customer_id: customer4.id,
        address: '45/12 ถ.',
        subdistrict: 'ต.',
        district: 'อ.',
        province: 'จ. ปทุมธานี',
        zip_code: '10230',
      },
      {
        customer_id: customer5.id,
        address: '261/38 ถ.',
        subdistrict: 'แขวง',
        district: 'เขต',
        province: 'กทม',
        zip_code: '10500',
      },
    ]);
  },
  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('customer_addresses');
  },
};
