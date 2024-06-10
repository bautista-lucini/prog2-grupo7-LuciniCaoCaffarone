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
               .then(function(usuario){
                  if(usuario){
                   throw new Error('El email ingresado ya existe.');
                  }
               })
    }),
    body('password')
        .notEmpty().withMessage('Debes completar la contraseña').bail()
        .isLength({ min: 4 }).withMessage('La contraseña debe contener al menos 4 caracteres'),
    body('fechaNacimiento')
        .isDate().withMessage('Debe ingresar una fecha en el formato YYYY/MM/DD').bail(),
    body("nroDocumento")
       .isNumeric().withMessage("Este campo debe ser completado solo con números").bail(),
    body('ftoPerfil')
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
