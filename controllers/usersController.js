const datos = require('../database/models/index')
const db = require('../database/models');
const usuarios = db.Usuario;
const productos = db.Producto;
const bcrypt = require('bcryptjs');
const {validationResult} = require('express-validator');

const usersController = {
    login: function(req, res) {
        res.render('login');
    },
    register: function(req, res) {
        return res.render ('register')
    },
    store: function(req,res){
        let formulario = req.body;
        let user = {
            name: formulario.name,
            email: formulario.email,
            usuario: formulario.usuario,
            contraseña: bcrypt.hashSync(formulario.contraseña, 10),
            fecha: formulario.birthday,
            dni: formulario.dni, 
            foto_perfil: formulario.profilePic,
            createdAt: new Date()
        }
        let errors = validationResult(req);
        if (errors.isEmpty()){
            db.Usuario.create(user)
            .then(function(result){
                res.redirect('/users/profile/' + result.id)
            })
        } else {
            res.render('register', {errors: errors.mapped(), old: req.body})
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