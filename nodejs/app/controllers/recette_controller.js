var categorie_model = require('../models/categorie_model');
var ingredient_model = require('../models/ingredient_model');
var recette_model = require('../models/recette_model');
var users_model = require('../models/users_model');
var async = require('async');

module.exports = {
    /** VIEWS **/
    item_view: function (req, res) {
        var id = parseInt(req.params.id, 10);
        if (isNaN(id)) {
            return res.render('404');
        }

        recette_model.get_from_id(id, function (err, recette) {
            if (err) {
                return res.status(500).json(err);
            }

            if (recette.recette == undefined || recette.note == undefined) {
                return res.status(404).render('404');
            }
            res.render('recette', recette);
        });
    },

    search_view: function (req, res) {
        var categories, ingredients;

        async.parallel([
            function (parallel_done) {
                categorie_model.get_noms(req.app.settings.config.config, function (err, result) {
                    if (err) {
                        return parallel_done(err);
                    }

                    categories = result;
                    parallel_done();
                });
            },
            function (parallel_done) {
                ingredient_model.get_noms(req.app.settings.config.config, function (err, result) {
                    if (err) {
                        return parallel_done(err);
                    }

                    ingredients = result;
                    parallel_done();
                });
            }
        ], function (err) {
            if (err) {
                return res.status(500).json(err);
            }
            res.render('recette_search', {
                categories: categories,
                ingredients: ingredients
            });
        });
    },

    edit_recette_view: function (req, res) {
        var categories, ingredients;

        async.parallel([
            function (parallel_done) {
                categorie_model.get_noms(req.app.settings.config.config, function (err, result) {
                    if (err) {
                        return parallel_done(err);
                    }

                    categories = result;
                    parallel_done();
                });
            },
            function (parallel_done) {
                ingredient_model.get_noms(req.app.settings.config.config, function (err, result) {
                    if (err) {
                        return parallel_done(err);
                    }

                    ingredients = result;
                    parallel_done();
                });
            }
        ], function (err) {
            if (err) {
                return res.status(500).json(err);
            }
            res.render('edit_recette', {
                categories: categories,
                ingredients: ingredients
            });
        });
    },

    /** OPERATIONS **/
    edit_recette: function (req, res) {
        var id_recette = parseInt(req.params.id, 10);
        if (isNaN(id_recette)) {
            return res.render('404');
        }

        console.log(req.body);

        recette_model.edit_recette(req.decoded.id, req.body, id_recette, req.app.settings.config.config, function (err, data) {
            if (err) {
                return res.status(500).json(err);
            }
            res.json(data);
        });

    },


    add_comment: function (req, res) {
        var text = req.body.comment;

        var id_recette = parseInt(req.params.id, 10);
        if (isNaN(id_recette)) {
            return res.render('404');
        }

        recette_model.add_comment(req.decoded.id, text, id_recette, function (err, comment) {
            if (err) {
                return res.status(500).json(err);
            }
            res.render('comment_recette', comment);
        });

    },

    add_rating: function (req, res) {
        var rate = req.body.rate;

        var id_recette = parseInt(req.params.id, 10);
        if (isNaN(id_recette)) {
            return res.render('404');
        }

        recette_model.add_rating(req.decoded.id, rate, id_recette, function (err, data) {
            if (err) {
                return res.status(500).json(err);
            }
            res.render('note', data);
        });
    },

    search: function (req, res) {
        var name = req.query.nom;
        var category = parseInt(req.query.category);
        var personCountMin = parseInt(req.query.personCountMin);
        var ratingMin = parseFloat(req.query.ratingMin);
        var ingredients;

        if (isNaN(category) || category == -1) {
            category = undefined;
        }

        if (isNaN(personCountMin) || personCountMin < 1 || personCountMin > 10) {
            personCountMin = undefined;
        }

        if (isNaN(ratingMin) || ratingMin < 0 || ratingMin > 3) {
            ratingMin = undefined;
        }

        try {
            ingredients = JSON.parse(req.query.ingredients);
        } catch (e) {
            ingredients = undefined;
        }

        if (!(ingredients instanceof Array)) {
            ingredients = undefined;
        } else {
            var remove = [];
            ingredients.forEach(function (elem, elemId) {
                if (typeof elem !== 'number') {
                    remove.push(elemId);
                } else {
                    ingredients[elemId] = Math.floor(elem);
                }
            });

            remove.forEach(function (elem) {
                ingredients.splice(elem, 1);
            });
        }

        recette_model.search(name, undefined, personCountMin, ratingMin, ingredients, function (err, result) {
            if (err) {
                return res.status(500).json(err);
            }

            res.status(200).json(result);
        });
    },

    create: function (req, res) {
        res.status(201).end('CREATE');
    },

    retrieve_all: function (req, res) {
        res.status(200).end('RETRIEVE ALL');
    },

    retrieve: function (req, res) {

    },

    update: function (req, res) {
        res.status(200).end('UPDATE: ' + req.params.id);
    },

    delete: function (req, res) {
        res.status(200).end('DELETE: ' + req.params.id);
    }
};