var express = require('express');
var router = express.Router();
const productsController = require('../controllers/productsController.js');

//router.get("/product", productsController.product)
router.get('/add/:username', productsController.add);
router.get('/:id', productsController.index); //metodo index no esta bien

module.exports = router;

