const router = require('express').Router();
const passport = require('passport');
const {
  createSalesOrder,
  getAllSalesOrder,
  getAllMySalesOrder,
  getSalesOrderById,
  editSalesOrderById,
  deleteSalesOrderById,
} = require('../controllers/salesOrder');

const auth = passport.authenticate('jwt', { session: false });

router.post('/', auth, createSalesOrder);
router.get('/', auth, getAllSalesOrder);
router.get('/', auth, getAllMySalesOrder);
router.get('/:id', auth, getSalesOrderById);
router.put('/:id', auth, editSalesOrderById);
router.delete('/:id', auth, deleteSalesOrderById);

module.exports = router;
