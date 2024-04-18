var express = require('express');
var router = express.Router();
const productsController = require('../controllers/productsController.js');

router.get('/:id', productsController.index);
router.get('/product-add', productsController.add);

module.exports = router;

