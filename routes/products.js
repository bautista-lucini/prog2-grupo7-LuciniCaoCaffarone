var express = require('express');
var router = express.Router();
const productsController = require('../controllers/productsController.js');

//router.get("/product", productsController.product)

router.get('/id/:id', productsController.products); 
router.get('/add', productsController.add);
router.get('/search-results', productsController.showOne);


router.get('/create', productsController.createForm);
router.post('/create', productsController.create);


module.exports = router;

