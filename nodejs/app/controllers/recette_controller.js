var categorie_model = require('../models/categorie_model');
var ingredient_model = require('../models/ingredient_model');
var recette_model = require('../models/recette_model');
var users_model   = require('../models/users_model');
var async = require('async');

module.exports = {
    /** VIEWS **/
    item_view: function (req, res) {
        var id = req.params.id || 0;
        recette_model.get_from_id(id, function (err, recette) {
            if (err) {
                return res.status(500).json(err);
            }

            if (recette.recette == undefined || recette.note == undefined) {
                return res.status(404).render('404', {
                    error: {
                        status: 404,
                        stack: 'Some informations about recette ' + id + ' couldn\'t be find'
                    }
                });
            }
            res.render('recette', recette);
        });
    },

    search_view: function (req, res) {
        var categories, ingredients;

        async.parallel([
            function (parallel_done) {
                categorie_model.get_noms(function (err, result) {
                    if (err) {
                        return res.status(500).json(err);
                    }

                    categories = result;
                    parallel_done();
                });
            },
            function (parallel_done) {
                ingredient_model.get_noms(function (err, result) {
                    if (err) {
                        return res.status(500).json(err);
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

    /** OPERATIONS **/
    add_comment: function (req, res) {
        //get token and user id correponding to it
        var token = req.body.token || req.query.token || req.headers['x-access-token'];
        var pseudo = req.body.pseudonyme;
        var text = req.body.comment;
        var id_recette = req.params.id || 0;
        users_model.get_id_from_token(token, req.app.settings.config, function(err, id_internaute) {
            if (err) {
                return res.status(500).json(err);
            }
            console.log(id_internaute);
            recette_model.add_comment(id_internaute, text, id_recette, function (err, comment) {
                if (err) {
                    return res.status(500).json(err);
                }
                res.render('comment_recette', comment);
            });
        });
    },

    create: function (req, res) {
        res.status(201).end('CREATE');
    },

    retrieve_all: function (req, res) {
        res.status(200).end('RETRIEVE ALL');
    },

    retrieve: function (req, res) {
        res.status(200).end('RETRIEVE: ' + req.params.id);
    },

    update: function (req, res) {
        res.status(200).end('UPDATE: ' + req.params.id);
    },

    delete: function (req, res) {
        res.status(200).end('DELETE: ' + req.params.id);
    }
};