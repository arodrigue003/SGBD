var ingredient_model = require('../models/ingredient_model');

module.exports = {
    /** VIEWS **/
    ranking_view: function (req, res) {
        ingredient_model.get_ranking(
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
    }
};