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
        { association: "duenio",
         
         },
        { association: "comentarios",include:['comentador'],order:['createdAt', 'desc'] }
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
  commentAdd: function (req, res){
if(res.locals.user){
  let comentario = {
    productos_id : req.params.productId, 
    usuario_id : res.locals.user.id , 
    texto_comentario : req.body.comentario,
    createdAt: new Date(),
  }
  db.Comentario.create(comentario)
  .then(function(){
    res.redirect("/products/id/"+ req.params.productId )
  })
}
else{
  res.redirect("/")
}
  },
  show: function (req, res) { 
    let id = req.params.id;
    let filtrado = {
      include: [
        { association: "duenio"},
        { association: "comentarios"}
      ]
    };

    db.Producto.findByPk(id, filtrado)
      .then(function (producto) {
        if (producto) {
          res.render("product", { producto: producto, user: res.locals.user });
        } else {
          res.status(404).send('Producto no encontrado');
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  },
  search: function (req, res) {
    res.render('product', { title: "Detalle del producto", productos: db.lista_productos, productId: req.params.id });
  },
  add: function (req, res) {
    res.render('product-add');
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
      res.redirect(`/users/profile/${req.session.user.id}`);
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
  edit: function (req, res) {
    let id = req.params.id;
    let filtro = {
      include: [{
        all: true,
        nested: true 
      }]
    };

    db.Producto.findByPk(id, filtro)
      .then((result) => {
        if (req.session.user && req.session.user.id === result.usuario_id) {
          res.render("product-edit", { productos: result });
        } else {
          res.redirect('/product/detail/' + id);
        }
      }).catch((err) => {
        console.log("Error: " + err);
      });
  },

  storeEdit: function (req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.render('product-edit', { errors: errors.array(), productos: req.body });
    }
    let info = req.body;
    let id = req.params.id;
    let filtro = { where: { id: id } };

    db.Producto.update(info, filtro)
      .then((result) => {
        return res.redirect("/products/detail/" + id);
      })
      .catch((err) => {
        console.log(err);
      });
  },
  delete: function (req, res) {
    let id = req.params.id;
    db.Producto.findByPk(id)
      .then((producto) => {
        if (producto.usuario_id === req.session.user.id) {
         db.Producto.destroy({
            where: { id: id }
          })
          .then(()=>{
            res.redirect('/users/profile/' + producto.usuario_id);
          })
        } else {
          res.redirect('/products/id/' + id);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

}
module.exports = productsController;