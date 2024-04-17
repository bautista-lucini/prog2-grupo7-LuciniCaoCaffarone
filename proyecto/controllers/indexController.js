const db = require('../db/medias.js');


const indexController = {
    index: function(req, res) {
        res.render('index', {"productos": db.lista_productos});
    },
    search: function(req, res) {
        res.render('search-results', {title: "Resultados de búsqueda", productos: db.productos});
    }
}

module.exports = indexController;