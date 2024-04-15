const db = require('../db/medias.js');

const indexController = {
    index: function(req, res) {
        res.render('index'/*, {title: "Aura Beauty", productos: db.productos}*/);
    },
    search: function(req, res) {
        res.render('search-results'/*, {title: "Resultados de búsqueda", productos: db.productos}*/);
    }
}

module.exports = indexController;