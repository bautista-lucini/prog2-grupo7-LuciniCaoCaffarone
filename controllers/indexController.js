const { Association } = require('sequelize');
const db = require('../database/models');

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