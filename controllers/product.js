const db = require('../models');

const getProductById = async (req, res) => {
  try {
    const productId = req.params.id;
    const readProductById = await db.Product.findOne({ where: { id: productId } });

    res.status(200).send(readProductById);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

const getAllProduct = async (req, res) => {
  try {
    const readAllProduct = await db.Product.findAll();

    res.status(200).send(readAllProduct);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

module.exports = { getProductById, getAllProduct };
