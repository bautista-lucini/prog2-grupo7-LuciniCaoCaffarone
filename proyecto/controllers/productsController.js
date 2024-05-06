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
const productsController = {
    index: function(req, res) {
        res.render('product',{title: "Detalle del producto", productos: db.lista_productos,  productId: req.params.id});
    },
    add: function(req, res) {
        res.render('product-add', {info:db, usuarios: db.lista_usuarios, productos: db.lista_productos, username: req.params.username });
    }
}
module.exports = productsController;