const db = require('../models');

const getAllCustomer = async (req, res) => {
  try {
    const allCustomer = await db.Customer.findAll({
      include: [{ model: db.CustomerAddress }, { model: db.Owner, include: [{ model: db.OwnerAddress }] }],
    });

    res.status(200).send(allCustomer);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

const getAllCustomerOfDepartment = async (req, res) => {
  try {
    const allEmployeeOfDepartmentIds = (
      await db.User.findAll({
        where: { department: req.user.department },
        include: [{ model: db.CustomerAddress }, { model: db.Owner, include: [{ model: db.OwnerAddress }] }],
      })
    ).map((e) => e.id);

    const allCustomerOfDepartmentIds = await db.Customer.findAll({ where: { user_id: allEmployeeOfDepartmentIds } });

    res.status(200).send(allCustomerOfDepartmentIds);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

const getAllMyCustomer = async (req, res) => {
  try {
    const readCustomerByCode = await db.Customer.findAll({
      where: { area_code: req.user.area_code },
      include: [{ model: db.CustomerAddress }, { model: db.Owner, include: [{ model: db.OwnerAddress }] }],
    });

    res.status(200).send(readCustomerByCode);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

const getCustomerByCode = async (req, res) => {
  try {
    const customerCode = req.params.code;
    const readCustomerByCode = await db.Customer.findOne({
      where: { user_id: req.user.id, code: customerCode },
      include: [{ model: db.CustomerAddress }, { model: db.Owner, include: [{ model: db.OwnerAddress }] }],
    });

    res.status(200).send(readCustomerByCode);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

module.exports = {
  getAllCustomer,
  getAllCustomerOfDepartment,
  getAllMyCustomer,
  getCustomerByCode,
};
