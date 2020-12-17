'use strict';
require('dotenv').config();
const bcryptjs = require('bcryptjs');
const salt = bcryptjs.genSaltSync(Number(process.env.SALT_ROUND));

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('users', [
      {
        code: '631201',
        email: 'saleRep1@OrderManage.com',
        password: bcryptjs.hashSync('saleRep1', salt),
        first_name: 'Salesrep',
        last_name: 'Ordermanage',
        department: 'OTC',
        position: 'Sales Representative',
        area_code: 'AR1',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        code: '631202',
        email: 'saleRep2@OrderManage.com',
        password: bcryptjs.hashSync('saleRep2', salt),
        first_name: 'Salesrepresent',
        last_name: 'Ordermanage',
        department: 'OTC',
        position: 'Sales Representative',
        area_code: 'AR2',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        code: '631203',
        email: 'saleRep3@OrderManage.com',
        password: bcryptjs.hashSync('saleRep3', salt),
        first_name: 'Sales',
        last_name: 'Ordermanage',
        department: 'OTC',
        position: 'Sales Representative',
        area_code: 'AR3',
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },
  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('users');
  },
};
