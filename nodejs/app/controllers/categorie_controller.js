var categorie_model = require('../models/categorie_model');

module.exports = {

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