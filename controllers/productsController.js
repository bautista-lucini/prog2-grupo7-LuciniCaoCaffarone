const db = require('../database/models');
const operadores = db.Sequelize.Op
const {validationResult} = require('express-validator');

// info para poder hacer controladores con sequelice 
let productsController = {
  //chequear
  products: function (req, res) {
    let idMedia = req.params.id;
    let filtrado = {
      include: [
        { association: "duenio" },
        { association: "comentarios" }
      ]
    }
    db.Producto.findAll(filtrado)
    .then(function (productos) {
        res.render("product", { productos: productos, productId: idMedia, user: res.locals.user });
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
  create: function (req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.render('product-add', { errors: errors.array(), info: db, usuarios: db.lista_usuarios, productos: db.lista_productos, username: req.params.username });
    } 
     db.Producto.create({
      nombre_producto: req.body.name,
      descripcion_producto: req.body.description,
      imagen_producto: req.body.image,
      createdAt: new Date(),
      updatedAt: new Date(),
      usuario_id: req.session.user.id  
    })
    
    .then(function () {
      res.redirect('/products');
    })
    
    .catch(function (error) {
      return console.log(error);
    });
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
  },
}
module.exports = productsController;