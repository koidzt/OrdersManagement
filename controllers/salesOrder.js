const { Op } = require('sequelize');
const db = require('../models');

//CREATE SALES ORDER WITH PRODUCT LIST
const createSalesOrder = async (req, res) => {
  try {
    const defaultSo = async () => {
      const date = new Date();
      console.log(date);
      let month = String(date.getMonth() + 1);
      if (Number(month) < 10) {
        month = '0' + month;
      }
      console.log(month);
      let year = String(date.getFullYear() + 43);
      console.log(year);
      const defaultTopFourthSo = year.slice(2) + month;
      const lastSalesOrder = await db.SalesOrder.findOne({
        where: {
          so: { [Op.startsWith]: defaultTopFourthSo },
        },
        order: [['so', 'DESC']],
      });
      let newSoNumber;
      if (lastSalesOrder) {
        newSoNumber = String(Number(lastSalesOrder.so) + 1);
      } else {
        newSoNumber = defaultTopFourthSo + '0001';
      }
      console.log({ newSoNumber, type: typeof newSoNumber });
      return newSoNumber;
    };

    const {
      date,
      po,
      customer_id,
      payment_term,
      credit_term,
      discount,
      total,
      total_ex_vat,
      total_in_vat,
      productList,
    } = req.body;
    if (date && customer_id && payment_term && credit_term && total && total_in_vat) {
      const total = productList.reduce((acc, product) => {
        return acc + product.amount;
      }, 0);
      const total_in_vat = productList.reduce((acc, product) => {
        return acc + product.amount_in_vat;
      }, 0);

      const newSalesOrder = await db.SalesOrder.create({
        user_id: req.user.id,
        customer_id,
        so: await defaultSo(),
        date,
        po,
        payment_term,
        credit_term,
        discount,
        total,
        total_ex_vat,
        total_in_vat,
      });
      console.log(newSalesOrder.id);
      productList.forEach(async (product) => {
        await db.ProductList.create({
          sales_order_id: newSalesOrder.id,
          product_id: product.id,
          // discount: product.discount,
          quantity: product.quantity,
          amount: product.amount,
          // vat: product.vat,
          price_in_vat: product.price_in_vat,
          amount_in_vat: product.amount_in_vat,
        });
      });
      res.status(201).send({ newSalesOrder });
    }
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

const getAllSalesOrder = async (req, res) => {
  try {
    const allSalesOrder = await db.SalesOrder.findAll({
      include: [
        {
          model: db.User,
          attributes: ['id', 'first_name', 'last_name', 'department', 'position', 'area_code'],
          //attributer คือโหลดเอาข้อมูลเฉพาะที่ใส่ ถ้าไม่มี attributer คือเอาข้อมูลทั้งหมดในตาราง
        },
        {
          model: db.Customer,
          attributes: ['id', 'area_code', 'code', 'name', 'contact', 'phone', 'tel'],
          include: [
            {
              model: db.CustomerAddress,
              attributes: ['id', 'address', 'subdistrict', 'district', 'province', 'zip_code'],
            },
          ],
        },
        {
          model: db.ProductList,
          include: [{ model: db.Product }],
        },
      ],
    });
    res.status(200).send(allSalesOrder);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

const getAllSalesOrderOfDepartment = async (req, res) => {
  try {
    const allEmployeeOfDepartmentIds = (
      await db.User.findAll({
        where: { department: req.user.department },
      })
    ).map((e) => e.id);

    const allSalesOrder = await db.SalesOrder.findAll({
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
          include: [
            {
              model: db.CustomerAddress,
              attributes: ['id', 'address', 'subdistrict', 'district', 'province', 'zip_code'],
            },
          ],
        },
        {
          model: db.ProductList,
          include: [{ model: db.Product }],
        },
      ],
    });
    res.status(200).send(allSalesOrder);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

const getAllMySalesOrder = async (req, res) => {
  try {
    const allMySalesOrder = await db.SalesOrder.findAll({
      where: { user_id: req.user.id },
      include: [
        {
          model: db.User,
          attributes: ['id', 'code', 'first_name', 'last_name', 'department', 'position', 'area_code'],
        },
        {
          model: db.Customer,
          attributes: ['id', 'area_code', 'code', 'name', 'contact', 'phone', 'tel'],
          include: [
            {
              model: db.CustomerAddress,
              attributes: ['id', 'address', 'subdistrict', 'district', 'province', 'zip_code'],
            },
          ],
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
    console.log(salesOrderId, req.user.id);
    const readSalesOrderById = await db.SalesOrder.findOne({
      where: { id: salesOrderId },
      include: [
        {
          model: db.User,
          attributes: ['id', 'code', 'first_name', 'last_name', 'department', 'position', 'area_code'],
        },
        {
          model: db.Customer,
          attributes: ['id', 'area_code', 'code', 'name', 'contact', 'phone', 'tel'],
          include: [
            {
              model: db.CustomerAddress,
              attributes: ['id', 'address', 'subdistrict', 'district', 'province', 'zip_code'],
            },
          ],
        },

        {
          model: db.ProductList,
          include: [{ model: db.Product }],
        },
      ],
    });
    if (req.user.position === 'Sales Representative') {
      if (readSalesOrderById.User.id !== req.user.id) {
        return res.send(null);
      }
    }
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
  getAllSalesOrderOfDepartment,
  getAllMySalesOrder,
  getSalesOrderById,
  editSalesOrderById,
  deleteSalesOrderById,
};
