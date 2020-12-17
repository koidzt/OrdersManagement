'use strict';

const { User } = require('../models');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const area1 = await User.findOne({ where: { area_code: 'AR1' } });
    const area2 = await User.findOne({ where: { area_code: 'AR2' } });
    const area3 = await User.findOne({ where: { area_code: 'AR3' } });

    return queryInterface.bulkInsert('customers', [
      {
        user_id: area1.id,
        code: 'CTM1-0001',
        name: 'Customer1',
        contact: 'กี้',
        phone: '0811234567',
        tel: '023334444',
        payment_term: 'Bank Transfer',
        credit_term: '30 วัน',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        user_id: area1.id,
        code: 'CTM1-0002',
        name: 'Customer2',
        contact: 'ดาว',
        phone: '0813334444',
        tel: '0244455555',
        payment_term: 'Cash',
        credit_term: '15 วัน',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        user_id: area2.id,
        code: 'CTM1-0003',
        name: 'Customer3',
        contact: 'พล',
        phone: '0892223333',
        tel: '032226666',
        payment_term: 'Bank Transfer',
        credit_term: '30 วัน',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        user_id: area2.id,
        code: 'CTM1-0004',
        name: 'Customer4',
        contact: 'เอก',
        phone: '0885557777',
        tel: '028880000',
        payment_term: 'Cash',
        credit_term: '45 วัน',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        user_id: area3.id,
        code: 'CTM1-0005',
        name: 'Customer5',
        contact: 'หยิน',
        phone: '0883238787',
        tel: '025659898',
        payment_term: 'Cash',
        credit_term: 'COD',
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },
  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('customers');
  },
};
