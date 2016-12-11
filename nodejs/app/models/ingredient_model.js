var pg = require('pg');

var db = require("./db");

module.exports = {
    get_ranking: function (cb) {
        var pool = new pg.Pool(db.get_config());

        console.log(db.get_config());

        pool.connect(function(err, client, done) {
            if (err) {
                return console.error('error fetching client from pool', err);
            }
            client.query("SELECT ingredient.id_ingredient, nom_ingredient, \
                            (moyenne_recette * ratio_calories * somme_commentaires) as score_classement\
                            FROM ingredient\
                                INNER JOIN MOYENNE_NOTES_RECETTES_INGREDIENTS\
                                    ON ingredient.id_ingredient = MOYENNE_NOTES_RECETTES_INGREDIENTS.id_ingredient\
                                INNER JOIN MOYENNE_CALORIES_INGREDIENTS\
                                    ON MOYENNE_NOTES_RECETTES_INGREDIENTS.id_ingredient = MOYENNE_CALORIES_INGREDIENTS.id_ingredient\
                                INNER JOIN SOMME_COMMENTAIRES_INGREDIENTS\
                                    ON MOYENNE_CALORIES_INGREDIENTS.id_ingredient = SOMME_COMMENTAIRES_INGREDIENTS.id_ingredient\
                            ORDER BY score_classement DESC;",
                        function (err, result) {            
                            done();

                            if(err) {
                                console.error('error running ranking query', err);
                                cb(err);
                            }
                            console.log(result.rows);
                            cb(null, result.rows);
                        });
        });
  
        pool.on('error', function(err, client) {
            console.error('idle client error', err.message, err.stack);
        });
    },

    get_noms: function(cb) {
        var pool = new pg.Pool(db.get_config());

        pool.connect(function(err, client, done) {
            if (err) {
                return cb(err);
            }
            client.query(
                "SELECT id_ingredient, nom_ingredient FROM INGREDIENT ORDER BY nom_ingredient",
                function (err1, result) {
                    if (err1) {
                        return cb(err1);
                    }

                    done();
                    cb(null, result.rows);
                });
        });


        pool.on('error', function(err, client) {
            cb(err);
        });
    }
};
