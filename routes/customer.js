const {
  getAllCustomer,
  getAllMyCustomer,
  getAllCustomerOfDepartment,
  getCustomerByCode,
} = require('../controllers/customer');
const router = require('express').Router();
const passport = require('passport');

const auth = passport.authenticate('jwt', { session: false });

router.get('/all', auth, getAllCustomer);
router.get('/byDepartment', auth, getAllCustomerOfDepartment);
router.get('/', auth, getAllMyCustomer);
router.get('/byCode/:code', auth, getCustomerByCode);

module.exports = router;
