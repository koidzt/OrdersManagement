const db = require('../models');

const createSalesOrder = async (req, res) => {
  try {
    const { so, date, po, customer_id, payment_term, credit_term, discount, total } = req.body;
    if (so || date || customer_id || payment_term || credit_term || total) {
      await db.SalesOrder.create({
        user_id: req.user.id,
        customer_id,
        so,
        date,
        po,
        payment_term,
        credit_term,
        discount,
        total,
      });
      res.status(201).send('Created Sales Oder success.');
    }
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

const readAllSalesOrder = async (req, res) => {
  try {
    const salesRepOfDepartment = (
      await db.User.findAll({
        where: { department: req.user.department },
      })
    ).map((e) => e.id);

    const allEmployeeOfDepartmentIds = [...salesRepOfDepartment, req.user.id];

    const allSalesOrder = await db.SalesOder.findAll({
      where: { user_id: allEmployeeOfDepartmentIds },
      include: [
        {
          model: db.User,
          attributes: ['id', 'code', 'first_name', 'last_name', 'department', 'position', 'area_code'],
        },
        {
          model: db.Customer,
          attributes: ['id', 'code', 'first_name', 'last_name', 'department', 'position', 'area_code'],
        },
        {
          model: db.ProductList,
          attributes: ['id', 'discount', 'quantity', 'amount', 'vat', 'price_in_vat', 'amount_in_vat'],
          include: [{ model: db.Product, attributes: ['id', 'product_code', 'name', 'description', 'unit', 'price'] }],
        },
      ],
      attributes: ['customer_id', 'so', 'date', 'po', 'payment_term', 'credit_term', 'discount', 'total'],
    });
    res.send(allSalesOrder);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

const readAllMySalesOrder = async (req, res) => {
  try {
    const allMySalesOrder = await db.SalesOder.findAll({
      where: { user_id: req.user.id },
      include: [
        {
          model: db.User,
          attributes: ['id', 'code', 'first_name', 'last_name', 'department', 'position', 'area_code'],
        },
        {
          model: db.Customer,
          attributes: ['id', 'code', 'first_name', 'last_name', 'department', 'position', 'area_code'],
        },
        {
          model: db.ProductList,
          attributes: ['id', 'discount', 'quantity', 'amount', 'vat', 'price_in_vat', 'amount_in_vat'],
          include: [{ model: db.Product, attributes: ['id', 'product_code', 'name', 'description', 'unit', 'price'] }],
        },
      ],
      attributes: ['customer_id', 'so', 'date', 'po', 'payment_term', 'credit_term', 'discount', 'total'],
    });
    res.send(allMySalesOrder);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

const readSalesOrderById = async (req, res) => {
  try {
    const salesOrderId = req.params.id;
    const salesOrderById = await db.SalesOder.findOne({
      where: { id: salesOrderId, user_id: req.user.id },
      include: [
        {
          model: db.User,
          attributes: ['id', 'code', 'first_name', 'last_name', 'department', 'position', 'area_code'],
        },
        {
          model: db.Customer,
          attributes: ['id', 'code', 'first_name', 'last_name', 'department', 'position', 'area_code'],
        },
        {
          model: db.ProductList,
          attributes: ['id', 'discount', 'quantity', 'amount', 'vat', 'price_in_vat', 'amount_in_vat'],
          include: [{ model: db.Product, attributes: ['id', 'product_code', 'name', 'description', 'unit', 'price'] }],
        },
      ],
      attributes: ['customer_id', 'so', 'date', 'po', 'payment_term', 'credit_term', 'discount', 'total'],
    });
    res.send(salesOrderById);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

// const editSalesOrderById = async (req, res) => {
//   try {
//   } catch (err) {
//     res.status(500).send({ message: err.message });
//   }
// };

const deleteSalesOrderById = async (req, res) => {
  try {
    const salesOrderId = req.params.id;
    await db.SalesOrder.destroy({ where: { id: salesOrderId, user_id: req.user.id } });
    res.status(204).send();
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

module.exports = {
  createSalesOrder,
  readAllSalesOrder,
  readAllMySalesOrder,
  readSalesOrderById,
  editSalesOrderById,
  deleteSalesOrderById,
};
