var express = require('express');
var router = express.Router();
const usersController = require('../controllers/usersController.js');
const { body } = require('express-validator');


let validations = [
    body('name')
        .notEmpty().withMessage('Debes completar el nombre').bail()
        .isLength({ min: 5 }).withMessage('El nombre debe ser más largo'),
    body('email')
      .notEmpty() 
      .isEmail()
      .custom(function(value){ 
           return db.User.findOne({
             where: { email: value }, 
           })
               .then(function(user){
                  if(user){
                   throw new Error('El email ingresado ya existe.');
    }
               })
    }),
    body('password')
    .notEmpty().withMessage('Debes completar la contraseña').bail()
    .isLength({ min: 8 }).withMessage('La contraseña debe ser más larga')
    ]
    


/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/register', validations, usersController.register);
router.get('/login', usersController.login);
router.get('/edit/:username', usersController.profileEdit);
router.get('/profile/:id', usersController.profile);

module.exports = router;
