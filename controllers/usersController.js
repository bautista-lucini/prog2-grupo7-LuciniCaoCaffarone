const datos = require('../database/models/index')
const db = require('../database/models');
const usuarios = db.Usuario
const productos = db.Producto
const {validationResult} = require('express-validator');

const usersController = {
    login: function(req, res) {
        res.render('login');
    },
    register: function(req, res) {
        let errors = validationResult(req);
        if (errors.isEmpty()) {
           
            let { nombre, email, password } = req.body;
            usuarios.create({
                nombre: nombre,
                email: email,
                password: password // encriptar la contraseña antes de guardarla
            })
            .then(usuario => {
                res.redirect('/profile/' + usuario.id);
            })
            .catch(error => {
                res.render('register', {
                    errors: { database: { msg: 'Error al crear el usuario. Inténtalo de nuevo.' } },
                    old: req.body
                });
            });

        } else {
            // Si hay errores, volvemos al formulario con los mensajes y los datos ingresados
            res.render('register', { errors: errors.mapped(), old: req.body });
        }
    },
    profile: function(req, res) {
        let id = req.params.id;
        let data = {
            usuario: null,
            productos: null,
        };
        usuarios.findByPk(id)
            .then((usuario) => {
                data.usuario = usuario;
                return productos.findAll({ where: { usuario_id: id } });
            })
            .then((producto) => {
                data.productos = producto;
                res.render('profile', { info: data });
            })
            .catch((error) => {
                // Manejar el error, por ejemplo, renderizar una vista de error o enviar un mensaje
                res.status(500).send(error.message);
            });
    },
    profileEdit: function(req, res) {
        res.render('profile-edit', { info: db, usuarios: db.lista_usuarios, productos: db.lista_productos, username: req.params.username });
    }
};


module.exports = usersController;