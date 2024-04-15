var express = require('express');
var router = express.Router();
const productsController = require('../controllers/productsController.js');

router.get('/', productsController.index);
router.get('/add', productsController.add);