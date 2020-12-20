const router = require('express').Router();
const { getProductById, getAllProduct } = require('../controllers/product');

router.get('/:id', getProductById);
router.get('/', getAllProduct);

module.exports = router;
