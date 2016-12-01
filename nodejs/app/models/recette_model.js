var pg = require('pg');
var async = require('async');

var config = {
    user: 'reader',
    database: 'cuisine',
    password: 'reader'
};

module.exports = {
    get_from_id: function (id, cb) {
        var pool = new pg.Pool(config);
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
                        console.log(result.rows[0]);
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
                        console.log(result.rows[0]);
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
                        console.log(result.rows);
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
                        console.log(result.rows);
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
                        console.log(result.rows);
                        parallel_done();
                    });
                });
            }
        ], function (err) {
            pool.end();
            if (err) return cb(err);
            cb(null, return_data);
        });

        /*client.connect(function (err) {
         if (err) {
         return cb(err);
         }

         client.query('SELECT * FROM recette WHERE id_recette = $1::int;', [id], function (err2, result) {
         if (err2) {
         return cb(err2);
         }

         cb(null, result.rows[0]);
         });
         });*/

        pool.on('error', function (err, client) {
            // if an error is encountered by a client while it sits idle in the pool
            // the pool itself will emit an error event with both the error and
            // the client which emitted the original error
            // this is a rare occurrence but can happen if there is a network partition
            // between your application and the database, the database restarts, etc.
            // and so you might want to handle it and at least log it out
            console.error('idle client error', err.message, err.stack)
        })
    },

    add_comment: function (pseudonyme, text, cb) {
        var pool = new pg.Pool(config);
        var id;


        pool.connect(function (err, client, done) {
            if (err) {
                return cb(err);
            }
            client.query('SELECT internaute.id_internaute AS id_internaute FROM internaute WHERE pseudonyme = $1;', [pseudonyme], function (err2, result) {
                done();

                console.log(result.rows);
                if (err2) {
                    return cb(err2);
                }

                // if user doesn't exist create it
                if (result.rows[0] == undefined) {
                    console.log('No such user : create it')
                    pool.connect(function (err, client, done) {
                        if (err) {
                            return cb(err);
                        }
                        client.query('INSERT INTO internaute(pseudonyme, mot_de_passe) VALUES($1::text, \'\');', [pseudonyme], function (err2, result) {
                            done();


                            if (err2) {
                                return cb(err2);
                            }

                            //pool.end();
                            return get_user_id()
                        });
                    });
                }
                else {
                    id = result.rows[0].id_internaute;
                    //pool.end();
                    return add_it();
                }
            });

            // retrieve user's id
            function get_user_id() {

                pool.connect(function (err, client, done) {
                    if (err) {
                        return cb(err);
                    }
                    client.query('SELECT internaute.id_internaute AS id_internaute FROM internaute WHERE pseudonyme = $1;', [pseudonyme], function (err2, result) {
                        done();

                        if (err2) {
                            return cb(err2);
                        }
                        console.log(result.rows);

                        if (result.rows[0] == undefined) {
                            return cb({
                                error: {
                                    status: 500,
                                    stack: 'Can\'t add comment for some unknowed reasons'
                                }
                            });
                        }
                        else {
                            id = result.rows[0].id_internaute;
                            add_it()
                        }
                    });
                });
            }

            function add_it() {
                //pool = new pg.Pool(config);

                console.log(id);


                pool.connect(function (err, client, done) {
                    if (err) {
                        return cb(err);
                    }
                    // TODO : Pour l'instant ajout à la recette 2 pour tester. A finir
                    client.query('INSERT INTO commentaire(id_internaute, id_recette, texte_commentaire, date_creation_commentaire) \
                            VALUES ($1::int, 2, $2::text, now());', [id, text], function (err2, result) {
                        done();

                        if (err2) {
                            return cb(err2);
                        }

                        console.log("Success");

                        pool.end();
                        cb(null, {
                            text: text,
                            id: id,
                            pseudonyme: pseudonyme
                        });
                    });
                });
            }


            pool.on('error', function (err, client) {
                // if an error is encountered by a client while it sits idle in the pool
                // the pool itself will emit an error event with both the error and
                // the client which emitted the original error
                // this is a rare occurrence but can happen if there is a network partition
                // between your application and the database, the database restarts, etc.
                // and so you might want to handle it and at least log it out
                console.error('idle client error', err.message, err.stack)
            })
        });
    }
};
