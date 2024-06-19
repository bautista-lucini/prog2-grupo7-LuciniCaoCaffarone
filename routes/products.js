var express = require('express');
var router = express.Router();
const productsController = require('../controllers/productsController.js');
const { body } = require('express-validator');


//router.get("/product", productsController.product)

router.get('/id/:id', productsController.products); 
router.get('/add', productsController.add);
router.get('/search-results', productsController.showOne);
router.post('/create', productsController.create);

router.get('/create', productsController.add);
router.post('/create', [
  body('name').notEmpty().withMessage('El nombre es obligatorio'),
  body('description').notEmpty().withMessage('La descripción es obligatoria'),
  body('image').notEmpty().withMessage('La imagen es obligatoria')
], productsController.create);


module.exports = router;

