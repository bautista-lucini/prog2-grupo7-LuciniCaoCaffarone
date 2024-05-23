const datos = require('../database/models/index')
const db = require('../database/models');
const usuarios = db.Usuario
const productos = db.Producto
//let indexController = {
   // index: function(req, res){}
      //  db.Movie.findAll()
       // .then(function (data){
        //   return res.send(data)
       // })
       // .catch(function(error){
     //       console.log(error);
       // })
       
    // info para poder hacer controladores con sequelice 
const usersController = {
    login:function(req,res){
        res.render('login')
    },
    register: function(req,res){
        res.render('register')
    },
    profile: function(req,res){
        let id = req.params.id
        let data = {
            usuario : null,
            productos : null,
        }
        usuarios.findByPk(id)
        .then((usuario)=>{
            data.usuario = usuario
            productos.findAll({where:[{usuario_id:id}]})
            .then((producto)=>{
                data.productos = producto
                res.render('profile',{info:data})
            }
            //return res.send(result)
            
        )})
       
    },
    profileEdit: function(req,res){
        res.render('profile-edit', {info:db, usuarios: db.lista_usuarios, productos: db.lista_productos, username: req.params.username})
    }
}

module.exports = usersController;