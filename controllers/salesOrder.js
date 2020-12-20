const db = require('../models');

//CREATE SALES ORDER WITH PRODUCT LIST
const createSalesOrder = async (req, res) => {
  try {
    const { so, date, po, customer_id, payment_term, credit_term, discount, productList } = req.body;
    if (so || date || customer_id || payment_term || credit_term) {
      const total = productList.reduce((acc, product) => {
        return acc + product.amount;
      }, 0);
      const total_in_vat = productList.reduce((acc, product) => {
        return acc + product.amount_in_vat;
      }, 0);

      const newSalesOrder = await db.SalesOrder.create({
        user_id: req.user.id,
        customer_id,
        so,
        date,
        po,
        payment_term,
        credit_term,
        discount,
        total,
        total_in_vat,
      });

      productList.forEach(async (product) => {
        await db.ProductList.create({
          sale_order_id: newSalesOrder.id,
          product_id: product.id,
          discount: product.discount,
          quantity: product.quantity,
          amount: product.amount * (1 - product.discount),
          vat: product.vat,
          price_in_vat: product.price_in_vat,
          amount_in_vat: product.amount_in_vat,
        });
      });
      res.status(201).send('Created Sales Order success.');
    }
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

const getAllSalesOrder = async (req, res) => {
  try {
    const allEmployeeOfDepartmentIds = (
      await db.User.findAll({
        where: { department: req.user.department },
      })
    ).map((e) => e.id);

    const allSalesOrder = await db.SalesOder.findAll({
      where: { user_id: allEmployeeOfDepartmentIds },
      include: [
        {
          model: db.User,
          attributes: ['id', 'first_name', 'last_name', 'department', 'position', 'area_code'],
          //attributer คือโหลดเอาข้อมูลเฉพาะที่ใส่ ถ้าไม่มี attributer คือเอาข้อมูลทั้งหมดในตาราง
        },
        {
          model: db.Customer,
          attributes: ['id', 'area_code', 'code', 'name', 'contact', 'phone', 'tel'],
        },
        {
          model: db.ProductList,
          include: [{ model: db.Product }],
        },
      ],
    });
    res.statue(200).send(allSalesOrder);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

const getAllMySalesOrder = async (req, res) => {
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
          attributes: ['id', 'area_code', 'code', 'name', 'contact', 'phone', 'tel'],
        },
        {
          model: db.ProductList,
          include: [{ model: db.Product }],
        },
      ],
    });
    res.send(allMySalesOrder);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

const getSalesOrderById = async (req, res) => {
  try {
    const salesOrderId = req.params.id;
    const readSalesOrderById = await db.SalesOder.findOne({
      where: { id: salesOrderId, user_id: req.user.id },
      include: [
        {
          model: db.User,
          attributes: ['id', 'code', 'first_name', 'last_name', 'department', 'position', 'area_code'],
        },
        {
          model: db.Customer,
          attributes: ['id', 'area_code', 'code', 'name', 'contact', 'phone', 'tel'],
        },
        {
          model: db.ProductList,
          include: [{ model: db.Product }],
        },
      ],
    });
    res.send(readSalesOrderById);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

const editSalesOrderById = async (req, res) => {
  try {
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

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
  getAllSalesOrder,
  getAllMySalesOrder,
  getSalesOrderById,
  editSalesOrderById,
  deleteSalesOrderById,
};
