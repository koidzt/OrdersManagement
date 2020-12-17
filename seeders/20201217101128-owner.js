'use strict';

const { Customer } = require('../models');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const customer1 = await Customer.findOne({ where: { name: 'Customer1' } });
    const customer2 = await Customer.findOne({ where: { name: 'Customer2' } });
    const customer3 = await Customer.findOne({ where: { name: 'Customer3' } });
    const customer4 = await Customer.findOne({ where: { name: 'Customer4' } });
    const customer5 = await Customer.findOne({ where: { name: 'Customer5' } });
    return queryInterface.bulkInsert('owners', [
      {
        customer_id: customer1.id,
        first_name: 'สมจิตร',
        last_name: 'เดือนเพ็ญ',
        id_card: '144445555221',
        phone: '0993334444',
      },
      {
        customer_id: customer2.id,
        first_name: 'กันฤทัย',
        last_name: 'สันติวงค์',
        id_card: '1222233333445',
        phone: '0889998888',
      },
      {
        customer_id: customer3.id,
        first_name: 'อิงฟ้า',
        last_name: 'ทิติยากร',
        id_card: '3333333333333',
        phone: '0838887777',
      },
      {
        customer_id: customer4.id,
        first_name: 'ทศพล',
        last_name: 'เทพสถิตสุข',
        id_card: '2222222222222',
        phone: '0132224444',
      },
      {
        customer_id: customer5.id,
        first_name: 'ธนพล',
        last_name: 'พัฒนไพรศาล',
        id_card: '1111111111111',
        phone: '0123335555',
      },
    ]);
  },
  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('owners');
  },
};
