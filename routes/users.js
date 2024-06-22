var express = require('express');
var router = express.Router();
const db = require('../database/models');
const usersController = require('../controllers/usersController.js');
const { body } = require('express-validator');
const bcrypt = require('bcryptjs');

let loginValidations = [
  body("email")
    .notEmpty().withMessage("Debe ingresar una dirección de correo.").bail()
    .custom(function(value,{req}){ 
      return db.Usuario.findOne({
        where: {email: value} })
          .then(function(user){
            if(!user){
              throw new Error("El email ingresado no existe.");
            }
            req.user = user;
          })
    }),
  body("contraseña")
    .notEmpty().withMessage("Debe ingresar una contraseña").bail()
    .custom(function(value,{req}) { 
      return db.Usuario.findOne({
        where: {email: req.body.email} 
      }).then(function(user) {
        if (!user) {
            req.session.error = "Debe ingresar un email válido.";
            throw new Error("Debe ingresar un email válido.");
        }
        const contraseñaValida = bcrypt.compareSync(value, user.contraseña);
        if (!contraseñaValida) {
          req.session.error = "Contraseña incorrecta.";
          throw new Error("Contraseña incorrecta.");
        } else{
          req.session.user = user;
          //if (req.body.recordarme) {
          //res.cookie('usuarioRecordado', user, { maxAge: 1000 * 60 * 60 * 24 * 7});
        //}
        }
      })
    })
]

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

let editValidations = [

  body("name")
  .notEmpty().bail(),
body('email') 
  .notEmpty() 
  .isEmail(),
body('usuario')
    .notEmpty().withMessage('Debes completar el nombre de usuario').bail()
    .isLength({ min: 5 }).withMessage('El nombre de usuario debe ser más largo'), 
body('contraseña')
    .bail()
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
router.post('/login', loginValidations, usersController.postLogin);

router.post('/logout', usersController.logout);

router.get('/edit/:id', editValidations, usersController.profileEdit);
router.get('/profile/:id', usersController.profile);
router.post('/update/:id',editValidations, usersController.updateUser);


router.get('/check-session', (req, res) => {
  res.json({ session: req.session });
});


module.exports = router;
