const db = require('../db/medias.js');

const productsController = {
    index: function(req, res) {
        res.render('product',{title: "Detalle del producto", productos: db.lista_productos,  productId: req.params.id});
    },
    add: function(req, res) {
        res.render('product-add', {title: "Añadir un producto", usuario: db.usuario});
    }
}
module.exports = productsController;