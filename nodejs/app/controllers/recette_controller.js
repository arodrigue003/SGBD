var recette_model = require('../models/recette_model');



module.exports = {
    /** VIEWS **/
    index_view: function (req, res) {
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

    /** OPERATIONS **/
    add_comment: function (req, res) {
        var pseudo = req.body.pseudonyme;
        var text = req.body.comment;
        var id = req.params.id || 0;
        recette_model.add_comment(pseudo, text, id, function (err, comment) {
            if (err) {
                return res.status(500).json(err);
            }
            res.render('comment_recette', comment);
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