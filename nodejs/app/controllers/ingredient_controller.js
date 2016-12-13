var ingredient_model = require('../models/ingredient_model');

var async = require('async');

module.exports = {
    /** VIEWS **/
    ranking_view: function (req, res) {
        ingredient_model.get_ranking(
            null,
            req.app.settings.config.config,
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
        ingredient_model.get_noms(req.app.settings.config.config, function (err, ingredients) {
            if (err) {
                return res.status(500).json(err);
            }

            res.json({
                ingredients: ingredients
            });
        });
    },
    item_view: function(req, res) {
        var id = parseInt(req.params.id, 10);
        if (isNaN(id)) {
            return res.render('404');
        }
        var ingredient = {}, caracs_nutrition, recettes;

        async.parallel([
            function (parallel_done) {
                ingredient_model.get_nom_by_id(id, req.app.settings.config.config, function (err, result) {
                    if (err) {
                        return parallel_done(err);
                    }

                    if (result == undefined) {
                        return parallel_done({status: 404});
                    }
                    ingredient.nom = result.nom_ingredient;
                    parallel_done();
                });
            },
            function (parallel_done) {
                ingredient_model.get_ranking(id, req.app.settings.config.config, function (err, result) {
                    if (err) {
                        return parallel_done(err);
                    }

                    if (result == undefined) {
                        return parallel_done({status: 404});
                    }
                    ingredient.ranking = result.score_classement;
                    parallel_done();
                });
            },
            function (parallel_done) {
                ingredient_model.get_recettes_used_in(id, req.app.settings.config.config, function (err, result) {
                    if (err) {
                        return parallel_done(err);
                    }

                    if (result == undefined) {
                        return parallel_done({status: 404});
                    }
                    recettes = result;
                    parallel_done();
                });
            },
            function (parallel_done) {
                ingredient_model.get_caracs_nutrition(id, req.app.settings.config.config, function (err, result) {
                    if (err) {
                        return parallel_done(err);
                    }

                    if (result == undefined) {
                        return parallel_done({status: 404});
                    }
                    caracs_nutrition = result;
                    parallel_done();
                });
            }

        ], function (err) {
            if (err) {
                if (err.status != undefined && err.status == 404) {
                    return res.status(404).render('404');
                } else {
                    return res.status(500).json(err);
                }
            }
            res.render('ingredient', {
                ingredient: ingredient,
                caracs_nutrition : caracs_nutrition,
                recettes : recettes
            });
        });
    }
};