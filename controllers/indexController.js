const { Association } = require('sequelize');
const db = require('../database/models');

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

const indexController = {
    index: function(req, res) {
        db.Producto.findAll({
            include: [{association: "duenio"}],
            order: [["createdAt","DESC"]],
            limit: 8, 
        })
        .then(function(result) {
            res.render('index', { productos: result, user: res.locals.user });
        })
        
    },
    search: function(req, res) {
        res.render('search-results', {title: "Resultados de búsqueda", productos: db.productos});
    }
}

module.exports = indexController;