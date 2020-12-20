'use strict';

const { SalesOrder, Product } = require('../models');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const salesOrder1 = await SalesOrder.findOne({ where: { so: '631201' } });
    const salesOrder2 = await SalesOrder.findOne({ where: { so: '631202' } });
    const salesOrder3 = await SalesOrder.findOne({ where: { so: '631203' } });
    const salesOrder4 = await SalesOrder.findOne({ where: { so: '631204' } });
    const product1 = await Product.findOne({ where: { name: 'product1' } });
    const product2 = await Product.findOne({ where: { name: 'product2' } });
    const product3 = await Product.findOne({ where: { name: 'product3' } });
    const product4 = await Product.findOne({ where: { name: 'product4' } });
    const product5 = await Product.findOne({ where: { name: 'product5' } });
    const product6 = await Product.findOne({ where: { name: 'product6' } });
    const product7 = await Product.findOne({ where: { name: 'product7' } });
    return queryInterface.bulkInsert('product_lists', [
      {
        sales_order_id: salesOrder1.id,
        product_id: product1.id,
        quantity: '2',
        amount: product1.price * 2,
        price_in_vat: product1.price * 1.07,
        amount_in_vat: product1.price * 2 * 1.07,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        sales_order_id: salesOrder1.id,
        product_id: product2.id,
        quantity: '1',
        amount: product2.price * 1,
        price_in_vat: product2.price * 1.07,
        amount_in_vat: product2.price * 1 * 1.07,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        sales_order_id: salesOrder1.id,
        product_id: product3.id,
        quantity: '3',
        amount: product3.price * 3,
        price_in_vat: product3.price * 1.07,
        amount_in_vat: product3.price * 3 * 1.07,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        sales_order_id: salesOrder2.id,
        product_id: product4.id,
        quantity: '5',
        amount: product4.price * 5,
        price_in_vat: product4.price * 1.07,
        amount_in_vat: product4.price * 5 * 1.07,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        sales_order_id: salesOrder2.id,
        product_id: product6.id,
        quantity: '3',
        amount: product6.price * 3,
        price_in_vat: product6.price * 1.07,
        amount_in_vat: product6.price * 3 * 1.07,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        sales_order_id: salesOrder3.id,
        product_id: product5.id,
        quantity: '1',
        amount: product5.price * (1 - 0.05),
        price_in_vat: product5.price * 0.95 * 1.07,
        amount_in_vat: product5.price * (1 - 0.05) * 1.07,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        sales_order_id: salesOrder4.id,
        product_id: product7.id,
        quantity: '2',
        amount: product7.price * 2,
        price_in_vat: product3.price * 1.07,
        amount_in_vat: product7.price * 2 * 1.07,
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },
  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('product_lists');
  },
};
