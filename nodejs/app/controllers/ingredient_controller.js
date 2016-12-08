var ingredient_model = require('../models/ingredient_model');

module.exports = {
    /** VIEWS **/
    ranking_view: function (req, res) {
        ingredient_model.get_ranking(
            function(ingredient_ranking) {
                if (ingredient_ranking == undefined) {
                    return res.status(404).render('404', {
                        error: {
                            status: 404,
                            stack: 'Some informations about ingredient ranking couldn\'t be found'
                        }
                    });
                }
                res.render('ingredient_ranking', {'ingredient_ranking': ingredient_ranking});
            }
        );
    },

    search_view: function (req, res) {
        res.render('ingredient_search');
    }
};