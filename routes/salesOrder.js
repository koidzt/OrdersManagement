const router = require('express').Router();
const passport = require('passport');
const {
  createSalesOrder,
  readAllMySalesOrder,
  readSalesOrderById,
  editSalesOrderById,
  deleteSalesOrderById,
} = require('../controllers/salesOrder');

const auth = passport.authenticate('jwt', { session: false });

router.post('/', auth, createSalesOrder);
router.get('/', auth, readAllMySalesOrder);
router.get('/:id', auth, readSalesOrderById);
router.put('/:id', auth, editSalesOrderById);
router.delete('/:id', auth, deleteSalesOrderById);

module.exports = router;
