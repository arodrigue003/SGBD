var pg = require('pg');

module.exports = {
    get_ranking: function (id, config, cb) {
        var pool = new pg.Pool(config);

        pool.connect(function(err, client, done) {
            if (err) {
                console.error('error fetching client from pool', err);
                return cb(err);
            }

            var query;
            if (id) {
                client.query("SELECT \
                            (moyenne_recette * ratio_calories * somme_commentaires) as score_classement\
                            FROM MOYENNE_NOTES_RECETTES_INGREDIENTS\
                                INNER JOIN MOYENNE_CALORIES_INGREDIENTS\
                                    ON MOYENNE_NOTES_RECETTES_INGREDIENTS.id_ingredient = MOYENNE_CALORIES_INGREDIENTS.id_ingredient\
                                INNER JOIN SOMME_COMMENTAIRES_INGREDIENTS\
                                    ON MOYENNE_CALORIES_INGREDIENTS.id_ingredient = SOMME_COMMENTAIRES_INGREDIENTS.id_ingredient\
                           WHERE MOYENNE_NOTES_RECETTES_INGREDIENTS.id_ingredient = $1::int",
                            [id],
                        function (err, result) {            
                            done();

                            if(err) {
                                console.error('error running ranking query', err);
                                return cb(err);
                            }
                            console.log(result.rows[0]);
                            cb(null, result.rows[0]);
                        }
                );
            }
            else if (id == null) {
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
                        function (err1, result) {            
                            done();

                            if(err1) {
                                console.error('error running ranking query', err);
                                return cb(err1);
                            }
                            console.log(result.rows);
                            cb(null, result.rows);
                        }
                );
            }
            
        });
  
        pool.on('error', function(err, client) {
            console.error('idle client error', err.message, err.stack);
        });
    },
    get_nom_by_id: function(id, config, cb) {
        var pool = new pg.Pool(config);

        pool.connect(function(err, client, done) {
            if (err) {
                return cb(err);
            }
            client.query(
                "SELECT nom_ingredient FROM INGREDIENT WHERE id_ingredient = $1::int",
                [id],
                function (err1, result) {
                    if (err1) {
                        return cb(err1);
                    }

                    done();
                    console.log(result.rows[0]);
                    cb(null, result.rows[0]);
                }
            );
        });
    },
    get_noms: function(config, cb) {
        var pool = new pg.Pool(config);

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
                    console.log(result.rows);
                    cb(null, result.rows);
                });
        });


        pool.on('error', function(err, client) {
            cb(err);
        });
    },
    get_recettes_used_in: function(id, config, cb) {
        var pool = new pg.Pool(config);

        pool.connect(function(err, client, done) {
            if (err) {
                return cb(err);
            }
            client.query(
                "SELECT recette.id_recette, nom_recette, date_creation_recette\
                FROM recette\
                  NATURAL JOIN ingredients_recette\
                WHERE id_ingredient = $1::int",
                [id],
                function (err1, result) {
                    if (err1) {
                        return cb(err1);
                    }

                    done();
                    console.log(result.rows);
                    cb(null, result.rows);
                });
        });


        pool.on('error', function(err, client) {
            cb(err);
        });
    },
    get_caracs_nutrition: function(id, config, cb) {
        var pool = new pg.Pool(config);

        pool.connect(function(err, client, done) {
            if (err) {
                return cb(err);
            }
            client.query(
                "SELECT nom_caracteristique, quantite_nutrition, unite_nutrition\
                FROM carac_nutritionnelle\
                NATURAL JOIN posseder_carac\
                WHERE id_ingredient = $1::int", 
                [id],
                function (err1, result) {
                    if (err1) {
                        return cb(err1);
                    }

                    done();
                    console.log(result.rows);
                    cb(null, result.rows);
                });
        });


        pool.on('error', function(err, client) {
            return cb(err);
        });
    }
};
