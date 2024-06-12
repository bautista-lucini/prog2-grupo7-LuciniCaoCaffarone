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

  //chequear desde esta linea hasta la 53


  products: function (req, res) {
    let idMedia = req.params.id;

    let filtrado = {
      include: [
        { association: "duenio" },
        { association: "comentarios" }
      ]
    }



    db.Producto.findByPk(idMedia, filtrado)
      .then(function (result) {
        //return res.render("detalleMovies", {movie: result})
        return res.send(result)
      })
      .catch(function (error) {
        return console.log(error);;
      });

  },


  search: function (req, res) {
    res.render('product', { title: "Detalle del producto", productos: db.lista_productos, productId: req.params.id });
  },
  add: function (req, res) {
    res.render('product-add', { info: db, usuarios: db.lista_usuarios, productos: db.lista_productos, username: req.params.username });
  },



  showOne: function(req, res) {
    
  let querys = req.query.search;
   //return res.send(querys)

    let filtrado = {
      where: [{nombre_producto: querys}]
    }

    db.Producto.findOne(filtrado)
    .then(function(result) {
      return res.send(result);
    }).catch(function(error) {
      return console.log(error);;
    });

    

  }
}
module.exports = productsController;