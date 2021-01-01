const router = require('express').Router();
const passport = require('passport');
const {
  createSalesOrder,
  getAllSalesOrder,
  getAllSalesOrderOfDepartment,
  getAllMySalesOrder,
  getSalesOrderById,
  editSalesOrderById,
  deleteSalesOrderById,
} = require('../controllers/salesOrder');

const auth = passport.authenticate('jwt', { session: false });

router.post('/', auth, createSalesOrder);
router.get('/all', auth, getAllSalesOrder);
router.get('/salesCo', auth, getAllSalesOrderOfDepartment); //sales-co
router.get('/salesRep', auth, getAllMySalesOrder); //sales-Rep
router.get('/:id', auth, getSalesOrderById);
router.put('/:id', auth, editSalesOrderById);
router.delete('/:id', auth, deleteSalesOrderById);

module.exports = router;
