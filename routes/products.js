var express = require('express');
var router = express.Router();
const productsController = require('../controllers/productsController.js');
const { body } = require('express-validator');


//router.get("/product", productsController.product)

router.get('/id/:id', productsController.products); 
router.get('/add', productsController.add);
router.get('/search-results', productsController.showOne);
router.post('/create', productsController.create);
router.post("/commentAdd/:productId",productsController.commentAdd);
router.get('/detail/:id', productsController.show);
router.get("/edit/:id", productsController.edit);
router.post("/edit/:id", productsController.storeEdit)
router.get("/delete/:id", productsController.delete);



module.exports = router;

