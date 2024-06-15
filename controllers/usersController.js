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
    //
    postLogin: function(req, res) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.render('login', {errors: errors.mapped(), old: req.body});
        } else {
            req.session.userId = req.user.id;
            res.redirect('/users/profile/' + req.session.userId);
        }
        if (req.body.recordarme) {
            res.cookie('userId', req.user.id, { maxAge: 30 * 24 * 60 * 60 * 1000 }); 
        }
    }, //
    register: function(req, res) {
        return res.render ('register')
    },
    store: function(req,res){
        let formulario = req.body;
        let user = {
            nombre: formulario.name,
            email: formulario.email,
            usuario: formulario.usuario,
            contraseña: bcrypt.hashSync(formulario.contraseña, 10),
            fecha: formulario.fechaNacimiento,
            dni: formulario.nroDocumento, 
            foto_perfil: formulario.fotoPerfil,
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
        let criterio = {
            include: [
                {association: "medias"},
                {association: "comentarios"},
                
            ],
            order: [["createdAt","DESC"]],
        };
        usuarios.findByPk(id,criterio)
        .then(function(usuario) {
            res.render("profile", { info: usuario });
          })
    },
    profileEdit: function(req, res) {
        res.render('profile-edit', { info: db, usuarios: db.lista_usuarios, productos: db.lista_productos, username: req.params.username });
    }
};

module.exports = usersController;