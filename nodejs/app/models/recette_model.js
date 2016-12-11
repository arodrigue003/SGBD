var pg = require('pg');
var async = require('async');

var config = {
    user: 'reader',
    database: 'cuisine',
    password: 'reader'
};

var sync = require('synchronize');
var fiber = sync.fiber;
var await = sync.await;
var defer = sync.defer;
var defers = sync.defers;

module.exports = {
    get_from_id: function (id, cb) {
        var pool = new pg.Pool(config);
        pool.on('error', function (err, client) { console.error('idle client error', err.message, err.stack) });
        var return_data = {};

        async.parallel([
            function (parallel_done) {
                pool.connect(function (err, client, done) {
                    if (err) {
                        return cb(err);
                    }
                    client.query('SELECT * FROM recette WHERE id_recette = $1::int;', [id], function (err2, result) {
                        done();

                        if (err2) {
                            return cb(err2);
                        }
                        return_data.recette = result.rows[0];
                        parallel_done();
                    });
                });
            },
            function (parallel_done) {
                pool.connect(function (err, client, done) {
                    if (err) {
                        return cb(err);
                    }
                    client.query('SELECT AVG(valeur) AS moyenne FROM note WHERE id_recette = $1::int;', [id], function (err2, result) {
                        done();

                        if (err2) {
                            return parallel_done(err2);
                        }
                        return_data.note = result.rows[0];
                        parallel_done();
                    });
                });
            },
            function (parallel_done) {
                pool.connect(function (err, client, done) {
                    if (err) {
                        return cb(err);
                    }
                    client.query('SELECT commentaire.date_creation_commentaire AS date_creation, \
                                    commentaire.id_recette AS id_recette, \
                                    commentaire.texte_commentaire AS text, \
                                    internaute.pseudonyme AS pseudo, \
                                    note.valeur AS note \
                                FROM commentaire \
                                NATURAL JOIN internaute \
                                LEFT JOIN note ON note.id_recette = commentaire.id_recette AND \
                                    internaute.id_internaute = note.id_internaute \
                                WHERE commentaire.id_recette = $1::int \
                                ORDER BY date_creation DESC;', [id], function (err2, result) {
                        done();

                        if (err2) {
                            return parallel_done(err2);
                        }
                        return_data.comments = result.rows;
                        parallel_done();
                    });
                });
            },
            function (parallel_done) {
                pool.connect(function (err, client, done) {
                    if (err) {
                        return cb(err);
                    }
                    client.query('SELECT quantite, unite, id_ingredient, ingredient \
                            FROM ingredients_recette \
                            WHERE id_recette = $1::int \
                            ORDER BY ingredient ASC;', [id], function (err2, result) {
                        done();

                        if (err2) {
                            return parallel_done(err2);
                        }
                        return_data.ingredients = result.rows;
                        parallel_done();
                    });
                });
            },
            function (parallel_done) {
                pool.connect(function (err, client, done) {
                    if (err) {
                        return cb(err);
                    }
                    client.query('SELECT categorie.nom_categorie AS nom_categorie, \
                            categorie.id_categorie AS id_categorie \
                            FROM recette \
                            NATURAL JOIN appartenir_categorie \
                            NATURAL JOIN categorie \
                            WHERE id_recette = $1::int \
                            ORDER BY nom_categorie ASC;', [id], function (err2, result) {
                        done();

                        if (err2) {
                            return parallel_done(err2);
                        }
                        return_data.categories = result.rows;
                        parallel_done();
                    });
                });
            }
        ], function (err) {
            pool.end();
            if (err) return cb(err);
            cb(null, return_data);
        });

    },

    add_comment: function (id_internaute, text, id_recette, cb) {
        fiber(function () {
            try {

                var pool = new pg.Pool(config);
                pool.on('error', function (err, client) { console.error('idle client error', err.message, err.stack)});

                //add the comment
                var connect = await(pool.connect(defers('client', 'done')));
                await(connect.client.query('INSERT INTO commentaire(id_internaute, id_recette, texte_commentaire, date_creation_commentaire) \
                                            VALUES ($1::int, $2::int, $3::text, now());', [id_internaute, id_recette, text],defer()));
                connect.done();

                //return the comment in order to view it
                connect = await(pool.connect(defers('client', 'done')));
                var results = await(connect.client.query('SELECT commentaire.date_creation_commentaire AS date_creation, \
                                    commentaire.id_recette AS id_recette, \
                                    commentaire.texte_commentaire AS text, \
                                    internaute.pseudonyme AS pseudo, \
                                    note.valeur AS note \
                                FROM commentaire \
                                NATURAL JOIN internaute \
                                LEFT JOIN note ON note.id_recette = commentaire.id_recette AND \
                                    internaute.id_internaute = note.id_internaute \
                                WHERE commentaire.id_recette = $1::int \
                                ORDER BY date_creation DESC LIMIT 1;', [id_recette], defer()));
                connect.done();

                pool.end();
                return cb(null, {success: true, comments : results.rows});


            } catch (err) {
                cb(err);
            }
        });
    },

    add_rating: function (id_internaute, rate, id_recette, cb) {
        fiber(function () {
            try {

                var pool = new pg.Pool(config);
                pool.on('error', function (err, client) { console.error('idle client error', err.message, err.stack)});

                //check if user already already noted the recette
                var connect = await(pool.connect(defers('client', 'done')));
                var result = await(connect.client.query('SELECT * FROM note WHERE id_recette = $1::int AND id_internaute = $2::int;', [id_recette, id_internaute],defer()));
                connect.done();
                if (result.rows[0] == undefined) {
                    //add
                    console.log('add-rate');
                    connect = await(pool.connect(defers('client', 'done')));
                    await(connect.client.query('INSERT INTO note (id_recette, id_internaute, valeur) VALUES($1::int, $2::int, $3::int);', [id_recette, id_internaute, rate],defer()));
                    connect.done();
                } else {
                    //update
                    console.log('edit-rate');
                    connect = await(pool.connect(defers('client', 'done')));
                    await(connect.client.query('UPDATE note SET valeur=$1::int WHERE id_recette=$2::int AND id_internaute=$3::int;', [rate, id_recette, id_internaute],defer()));
                    connect.done();

                }

                //return new rate of the recette
                connect = await(pool.connect(defers('client', 'done')));
                result = await(connect.client.query('SELECT AVG(valeur) AS moyenne FROM note WHERE id_recette = $1::int;', [id_recette],defer()));
                connect.done();

                pool.end();
                return cb(null, {success: true, note:{moyenne : result.rows[0].moyenne}});


            } catch (err) {
                cb(err);
            }
        });
    }

};
