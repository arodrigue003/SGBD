var home_model = require('../models/home_model');

module.exports = {

    index: function(req, res) {
        home_model.get_random_recettes(function (err, recette) {
            if (err) {
                return res.status(500).json(err);
            }

            if (recette.recettes == undefined) {
                return res.status(404).render('404', {
                    error: {
                        status: 404,
                        stack: 'Some informations about recettes couldn\'t be find'
                    }
                });
            }
            res.render('index', recette);
        });
    }
};