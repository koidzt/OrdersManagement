'use strict';

const { User, Customer } = require('../models');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const user1 = await User.findOne({ where: { area_code: 'AR1' } });
    const user2 = await User.findOne({ where: { area_code: 'AR2' } });
    const customer1 = await Customer.findOne({ where: { name: 'Customer1' } });
    const customer2 = await Customer.findOne({ where: { name: 'Customer2' } });
    const customer3 = await Customer.findOne({ where: { name: 'Customer3' } });
    return queryInterface.bulkInsert('sales_orders', [
      {
        user_id: user1.id,
        customer_id: customer2.id,
        so: '63120001',
        date: new Date(),
        po: '',
        payment_term: customer2.payment_term,
        credit_term: customer2.credit_term,
        discount: '0.03',
        vat: '0.07',
        total: '679',
        total_in_vat: '726.53',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        user_id: user2.id,
        customer_id: customer3.id,
        so: '63120002',
        date: new Date(),
        po: '',
        payment_term: customer3.payment_term,
        credit_term: customer3.credit_term,
        discount: '0',
        vat: '0.07',
        total: '1750',
        total_in_vat: '1872.5',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        user_id: user1.id,
        customer_id: customer1.id,
        so: '63120003',
        date: new Date(),
        po: '',
        payment_term: customer1.payment_term,
        credit_term: customer1.credit_term,
        discount: '0.05',
        vat: '0.07',
        total: '950',
        total_in_vat: '1016.5',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        user_id: user1.id,
        customer_id: customer1.id,
        so: '63120004',
        date: new Date(),
        po: '',
        payment_term: customer1.payment_term,
        credit_term: customer1.credit_term,
        discount: '0',
        vat: '0.07',
        total: '1440',
        total_in_vat: '1540.8',
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },
  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('sales_orders');
  },
};
