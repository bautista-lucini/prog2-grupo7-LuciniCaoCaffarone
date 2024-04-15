//const db = require('../db/basededatos.sql');

const usersController = {
    login:function(req,res){
        res.render('login')
    },
    register: function(req,res){
        res.render('register')
    },
    profile: function(req,res){
        res.render('profile')
    
    },
    userEdit: function(req,res){
        res.render('user-edit')
    }
}

module.exports = usersController;