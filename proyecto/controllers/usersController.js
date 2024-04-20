const db = require('../db/medias.js');

const usersController = {
    login:function(req,res){
        res.render('login')
    },
    register: function(req,res){
        res.render('register')
    },
    profile: function(req,res){
        res.render('profile',{info:db, usuarios: db.lista_usuarios, productos: db.lista_productos, username: req.params.username})
    },
    profileEdit: function(req,res){
        res.render('profile-edit', {info:db, usuarios: db.lista_usuarios, productos: db.lista_productos, username: req.params.username})
    }
}

module.exports = usersController;