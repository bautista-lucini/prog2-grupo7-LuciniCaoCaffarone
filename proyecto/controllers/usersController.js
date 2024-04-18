const db = require('../db/medias.js');

const usersController = {
    login:function(req,res){
        res.render('login')
    },
    register: function(req,res){
        res.render('register')
    },
    profile: function(req,res){
        res.render('profile',{info:db})
    
    },
    profileEdit: function(req,res){
        res.render('profile-edit')
    }
}

module.exports = usersController;