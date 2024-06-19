const db = require('../database/models');
const operadores = db.Sequelize.Op

// info para poder hacer controladores con sequelice 
const productsController = {
  //chequear
  products: function (req, res) {
    let idMedia = req.params.id;
    let filtrado = {
      include: [
        { association: "duenio",
          attributes: ["nombre"]
         },
        { association: "comentarios" }
      ]
    }
    db.Producto.findByPk(idMedia, filtrado) 
      .then(function (producto) {
        if (producto) {
          res.render("product", { producto: producto, user: res.locals.user });
        } else {
          res.status(404).send('Producto no encontrado');
        }
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
      where:{[operadores.or]: [{nombre_producto:{[operadores.like]:"%"+ querys + "%"}},{descripcion_producto: {[operadores.like]: "%" +querys + "%"}}]},
      include: [{association:'duenio'}],
      order: [["createdAt","DESC"]]
      //agregar los include
    }
    db.Producto.findAll(filtrado)
    .then(function(result) {
      //return res.send(result);
      res.render('search-results',{data:result})
    }).catch(function(error) {
      return console.log(error);;
    });
  }
}
module.exports = productsController;