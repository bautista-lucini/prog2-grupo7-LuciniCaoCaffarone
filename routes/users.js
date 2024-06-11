var express = require('express');
var router = express.Router();
const db = require('../database/models');
const usersController = require('../controllers/usersController.js');
const { body } = require('express-validator');

let registerValidations = [
    body("name")
      .notEmpty().bail(),
    body('email')
      .notEmpty() 
      .isEmail()
      .custom(function(value){ 
           return db.Usuario.findOne({
             where: { email: value }, 
           })
               .then(function(usuario){
                  if(usuario){
                   throw new Error('El email ingresado ya existe.');
                  }
               })
    }),
    body('usuario')
        .notEmpty().withMessage('Debes completar el nombre de usuario').bail()
        .isLength({ min: 5 }).withMessage('El nombre de usuario debe ser más largo'), 
    body('contraseña')
        .notEmpty().withMessage('Debes completar la contraseña').bail()
        .isLength({ min: 4 }).withMessage('La contraseña debe contener al menos 4 caracteres'),
    body('fechaNacimiento')
        .isDate().withMessage('Debe ingresar una fecha en el formato YYYY/MM/DD').bail(),
    body("nroDocumento")
       .isNumeric().withMessage("Este campo debe ser completado solo con números").bail(),
    body('fotoPerfil')
]

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/register', usersController.register);
router.post('/store', registerValidations, usersController.store);

router.get('/login', usersController.login);
router.get('/edit/:username', usersController.profileEdit);
router.get('/profile/:id', usersController.profile);

module.exports = router;
