var ingredient_model = require('../models/ingredient_model');

var async = require('async');

module.exports = {
    /** VIEWS **/
    ranking_view: function (req, res) {
        ingredient_model.get_ranking(
            null,
            function(err, ingredient_ranking) {
                if (ingredient_ranking == undefined) {
                    return res.status(404).render('404', {
                        error: {
                            status: 404,
                            stack: 'Some informations about ingredient ranking couldn\'t be found'
                        }
                    });
                }
                if(err) {
                    return res.status(500).json(err);
                }
                res.render('ingredient_ranking', {'ingredient_ranking': ingredient_ranking});
            }
        );
    },
    /** OPERATIONS **/
    get_noms: function (req, res) {
        ingredient_model.get_noms(function (err, ingredients) {
            if (err) {
                return res.status(500).json(err);
            }

            res.json({
                ingredients: ingredients
            });
        });
    },
    item_view: function(req, res) {
        var id = req.params.id || 0;
        var ingredient = {}, caracs_nutrition, recettes;

        async.parallel([
            function (parallel_done) {
                ingredient_model.get_nom_by_id(id, req.app.settings.config.config, function (err, result) {
                    if (err) {
                        return res.status(500).json(err);
                    }

                    ingredient.nom = result.nom_ingredient;
                    parallel_done();
                });
            },
            function (parallel_done) {
                ingredient_model.get_ranking(id, req.app.settings.config.config, function (err, result) {
                    if (err) {
                        return res.status(500).json(err);
                    }

                    ingredient.ranking = result.score_classement;
                    parallel_done();
                });
            },
            function (parallel_done) {
                ingredient_model.get_recettes_used_in(id, req.app.settings.config.config, function (err, result) {
                    if (err) {
                        return res.status(500).json(err);
                    }

                    recettes = result;
                    parallel_done();
                });
            },
            function (parallel_done) {
                ingredient_model.get_caracs_nutrition(id, req.app.settings.config.config, function (err, result) {
                    if (err) {
                        return res.status(500).json(err);
                    }

                    caracs_nutrition = result;
                    parallel_done();
                });
            }

        ], function (err) {
            if (err) {
                return res.status(500).json(err);
            }
            console.log("DEBUG");
            console.log(ingredient);
            console.log(caracs_nutrition);
            console.log(recettes);
            res.render('ingredient', {
                ingredient: ingredient,
                caracs_nutrition : caracs_nutrition,
                recettes : recettes
            });
        });
    }
};