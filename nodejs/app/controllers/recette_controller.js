var recette_model = require('../models/recette_model');

module.exports = {
    /** VIEWS **/
    index_view: function (req, res) {
        recette_model.get_from_id(0, function (err, recette) {
            if (err) {
                return res.status(500).json(err);
            }

            res.render('recette', recette);
        });
    },

    /** OPERATIONS **/
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