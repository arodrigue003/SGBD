var categorie_model = require('../models/categorie_model');
var recette_model = require('../models/recette_model');
var async = require('async');

module.exports = {
    liste: function (req, res) {
        categorie_model.get_noms(req.app.settings.config.config, function (err, categories) {
            if (err) {
                return res.status(500).json(err);
            }

            res.render('liste_categories', {
                categories: categories
            });
        });
    },

    index: function (req, res) {
        var categorieId = parseInt(req.params.id);
        var recettes = [];
        var categorie;

        async.parallel([
            function (done) {
                recette_model.search(undefined, categorieId, undefined, undefined, undefined, function (err, result) {
                    if (err) {
                        return done(err);
                    }

                    recettes = result;
                    done();
                });
            },
            function (done) {
                categorie_model.get_nom(req.app.settings.config.config, categorieId, function (err, result) {
                    if (err) {
                        return done(err);
                    }

                    categorie = result[0];
                    done();
                });
            }
        ], function (err) {
            if (err) {
                return res.status(500).json(err);
            }

            res.render('categories', {
                recettes: recettes,
                categorie: categorie
            });
        });

    },

    get_noms: function(req, res) {
        categorie_model.get_noms(req.app.settings.config.config, function (err, categories) {
            if (err) {
                return res.status(500).json(err);
            }

            res.json({
                categories: categories
            });
        });
    }
};