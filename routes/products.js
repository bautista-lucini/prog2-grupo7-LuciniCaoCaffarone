var express = require('express');
var router = express.Router();
const productsController = require('../controllers/productsController.js');

//router.get("/product", productsController.product)

router.get('/id/:id', productsController.products); //metodo index no esta bien
router.get('/add', productsController.add);
router.get('/search-results', productsController.showOne);


module.exports = router;

