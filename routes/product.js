const router = require('express').Router();
const { getProductById, getAllProduct } = require('../controllers/product');
const passport = require('passport');

const auth = passport.authenticate('jwt', { session: false });

router.get('/:id', auth, getProductById);
router.get('/', auth, getAllProduct);

module.exports = router;
