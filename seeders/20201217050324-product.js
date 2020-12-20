'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('products', [
      {
        code: 'POM-001',
        name: 'product1',
        description: 'description1',
        unit: 'bottle',
        price: '70',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        code: 'POM-002',
        name: 'product2',
        description: 'description2',
        unit: 'box',
        price: '200',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        code: 'POM-003',
        name: 'product3',
        description: 'description3',
        unit: 'tube',
        price: '120',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        code: 'POM-004',
        name: 'product4',
        description: 'description4',
        unit: 'unit',
        price: '50',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        code: 'POM-005',
        name: 'product5',
        description: 'description5',
        unit: 'box',
        price: '1000',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        code: 'POM-006',
        name: 'product6',
        description: 'description6',
        unit: 'carton',
        price: '500',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        code: 'POM-007',
        name: 'product7',
        description: 'description7',
        unit: 'box',
        price: '720',
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },
  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('products');
  },
};
