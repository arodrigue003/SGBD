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

function escape(unsafe) {
    return unsafe
        .replace(/[\0\x08\x09\x1a\n\r"'\\\%]/g, function (char) {
            switch (char) {
                case "\0":
                    return "\\0";
                case "\x08":
                    return "\\b";
                case "\x09":
                    return "\\t";
                case "\x1a":
                    return "\\z";
                case "\n":
                    return "\\n";
                case "\r":
                    return "\\r";
                case "\"":
                case "'":
                case "\\":
                case "%":
                    return "\\"+char; // prepends a backslash to backslash, percent,
                                      // and double/single quotes
            }
        })
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}

module.exports = {
    get_from_id: function (id, cb) {
        var pool = new pg.Pool(config);
        pool.on('error', function (err, client) {
            console.error('idle client error', err.message, err.stack)
        });
        var return_data = {};

        async.parallel([
            function (parallel_done) {
                pool.connect(function (err, client, done) {
                    if (err) {
                        return parallel_done(err);
                    }
                    client.query('SELECT * FROM recette WHERE id_recette = $1::int;', [id], function (err2, result) {
                        done();

                        if (err2) {
                            return parallel_done(err2);
                        }
                        return_data.recette = result.rows[0];
                        parallel_done();
                    });
                });
            },
            function (parallel_done) {
                pool.connect(function (err, client, done) {
                    if (err) {
                        return parallel_done(err);
                    }
                    client.query('SELECT * FROM menu NATURAL JOIN appartenir_menu WHERE id_recette = $1::int;', [id], function (err2, result) {
                        done();

                        if (err2) {
                            return parallel_done(err2);
                        }
                        return_data.menu = result.rows;
                        parallel_done();
                    });
                });
            },
            function (parallel_done) {
                pool.connect(function (err, client, done) {
                    if (err) {
                        return parallel_done(err);
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
                        return parallel_done(err);
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
                        return parallel_done(err);
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
                        return parallel_done(err);
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
            if (err) {
                return cb(err);
            }
            cb(null, return_data);
        });

    },

    add_comment: function (id_internaute, text, id_recette, cb) {
        if (text == '') {
            return cb({message: 'Can\'t add a null length comment', status: 403});
        }

        fiber(function () {
            try {

                var pool = new pg.Pool(config);
                pool.on('error', function (err, client) {
                    console.error('idle client error', err.message, err.stack)
                });

                //add the comment
                var connect = await(pool.connect(defers('client', 'done')));
                await(connect.client.query('INSERT INTO commentaire(id_internaute, id_recette, texte_commentaire, date_creation_commentaire) \
                                            VALUES ($1::int, $2::int, $3::text, now());', [id_internaute, id_recette, text], defer()));
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
                return cb(null, {success: true, comments: results.rows});


            } catch (err) {
                cb(err);
            }
        });
    },

    add_rating: function (id_internaute, rate, id_recette, cb) {
        fiber(function () {
            try {
                var pool = new pg.Pool(config);
                pool.on('error', function (err, client) {
                    console.error('idle client error', err.message, err.stack)
                });

                //check if user already already noted the recette
                var connect = await(pool.connect(defers('client', 'done')));
                var result = await(connect.client.query('SELECT * FROM note WHERE id_recette = $1::int AND id_internaute = $2::int;', [id_recette, id_internaute], defer()));
                connect.done();
                if (result.rows[0] == undefined) {
                    //add
                    console.log('add-rate');
                    connect = await(pool.connect(defers('client', 'done')));
                    await(connect.client.query('INSERT INTO note (id_recette, id_internaute, valeur) VALUES($1::int, $2::int, $3::int);', [id_recette, id_internaute, rate], defer()));
                    connect.done();
                } else {
                    //update
                    console.log('edit-rate');
                    connect = await(pool.connect(defers('client', 'done')));
                    await(connect.client.query('UPDATE note SET valeur=$1::int WHERE id_recette=$2::int AND id_internaute=$3::int;', [rate, id_recette, id_internaute], defer()));
                    connect.done();

                }

                //return new rate of the recette
                connect = await(pool.connect(defers('client', 'done')));
                result = await(connect.client.query('SELECT AVG(valeur) AS moyenne FROM note WHERE id_recette = $1::int;', [id_recette], defer()));
                connect.done();

                pool.end();
                return cb(null, {success: true, note: {moyenne: result.rows[0].moyenne}});


            } catch (err) {
                cb(err);
            }
        });
    },

    search: function (name, category, personCountMin, ratingMin, ingredients, cb) {
        fiber(function () {
            try {
                if (ingredients == undefined) {
                    ingredients = [];
                }

                var pool = new pg.Pool(config);
                pool.on('error', function (err, client) { console.error('idle client error', err.message, err.stack) });

                var queryParams = [];
                var params = [];

                if (name != undefined) {
                    queryParams.push('nom_recette ILIKE \'%' + escape(name) + '%\'');
                }

                if (personCountMin != undefined) {
                    queryParams.push('nombre_personnes >= ' + personCountMin);
                }

                if (ratingMin != undefined) {
                    queryParams.push('note_moyenne >= ' + ratingMin);
                }

                if (category != undefined) {
                    queryParams.push('id_categorie = ' + category);
                }

                queryParams = queryParams.join(' AND ');

                var ingredients_list = ingredients.join(', ');
                if (ingredients_list != '') {
                    ingredients_list = 'id_ingredient IN (' + ingredients_list + ')';
                }

                var whereClause = '';
                if (queryParams == '' && ingredients_list != '') {
                    whereClause = 'WHERE ' + ingredients_list;
                } else if (queryParams != '' && ingredients_list == '') {
                    whereClause = 'WHERE ' + queryParams;
                } else if (queryParams != '' && ingredients_list != '') {
                    whereClause = 'WHERE ' + queryParams + ' AND ' + ingredients_list;
                }

                var query = 'SELECT DISTINCT id_recette, nom_recette, nombre_personnes, \
                    note_moyenne, nombre_commentaires FROM info_recette  \
                    NATURAL JOIN categories_recette ' + whereClause +
                    ' ORDER BY note_moyenne DESC, nombre_personnes DESC;';

                var connect = await(pool.connect(defers('client', 'done')));
                var recettes = await(connect.client.query(query, params, defer())).rows;

                if (recettes.length == 0) {
                    return cb(null, recettes);
                }

                var recettes_id_list = recettes.map(function (recette) {
                    return recette.id_recette;
                }).join(', ');

                var categories = await(connect.client.query('SELECT * FROM categories_recette WHERE id_recette IN (' +
                    recettes_id_list + ')', [], defer())).rows;

                connect.done();
                pool.end();

                recettes.map(function (recette) {
                    recette.categories = [];
                    return recette;
                });

                categories.forEach(function (category) {
                    recettes = recettes.map(function (recette) {
                        if (recette.id_recette == category.id_recette) {
                            recette.categories.push(category.nom_categorie);
                            return recette;
                        }
                        return recette;
                    });
                });

                cb(null, recettes);
            } catch (err) {
                cb(err);
            }
        });
    },

    edit_recette: function (id_internaute, data, id_recette, config, cb) {
        var client = new pg.Client(config);
        client.connect();

        var rollback = function (client, err) {
            client.query('ROLLBACK', function () {
                client.end();
                return cb(err);
            });
        };

        client.query('BEGIN', function (err, result) {
            if (err) return rollback(client);

            if (id_recette != -1) {
                //backup preparation to history table
                client.query('INSERT INTO historique_modif (id_internaute, id_recette, texte_concerne) VALUES ($1, $2, $3);', [id_internaute, id_recette, data['text-recette']], function (err, result) {
                    if (err) return rollback(client, err);

                    //update recette basics
                    client.query('UPDATE recette SET nom_recette=$1, temps_preparation=$2, temps_cuisson=$3, nombre_personnes=$4, texte_preparation=$5 \
                    WHERE id_recette=$6', [data['recette-name'], data['temps-preparation'], data['temps-cuisson'], data['quant'], data['text-recette'], id_recette], after_recette);
                });
            } else {

                //create a new recette
                client.query('INSERT INTO recette (nom_recette, temps_preparation, temps_cuisson, nombre_personnes, texte_preparation) VALUES  \
                ($1, $2, $3, $4, $5) RETURNING id_recette', [data['recette-name'], data['temps-preparation'], data['temps-cuisson'], data['quant'], data['text-recette']], function (err,result) {
                    if (err) return rollback(client, err);
                    id_recette = result.rows[0]['id_recette'];
                    after_recette(err, result)
                });

            }
        });


        function after_recette(err, results) {
            if (err) return rollback(client, err);

            //update composition
            client.query('DELETE FROM composition_recette WHERE id_recette=$1;', [id_recette], function (err, result) {
                if (err) return rollback(client, err);

                var todo = false;
                var counter = 2;
                var array = [id_recette];
                var query = 'INSERT INTO composition_recette (id_ingredient, id_recette, quantite, unite) VALUES'
                for (var key in data) {
                    if (/^ingredient[0-9]*$/.test(key)) {
                        if (data[key] != '') {
                            todo = true;
                            var id_ingredient = key.match(/^ingredient([0-9]*)$/)[1];
                            query += '($' + counter + ', $1, $' + (counter + 1) + ', $' + (counter + 2) + '),';
                            counter += 3;
                            array.push(id_ingredient, data[key], data['ingredient-unite' + id_ingredient]);
                        }
                    }
                }
                query = query.substring(0, query.length - 1) + ';';
                console.log(query);
                console.log(array);

                if (todo == true) {
                    client.query(query, array, after_ingredient);
                }
                else after_ingredient(null, null);
            });
        };


        function after_ingredient(err, results) {
            if (err) return rollback(client, err);

            //update categorie
            client.query('DELETE FROM appartenir_categorie WHERE id_recette=$1;',   [id_recette], function (err, result) {
                if (err) return rollback(client, err);

                var todo = false;
                var counter = 2;
                var array = [id_recette];
                var query = 'INSERT INTO appartenir_categorie (id_recette, id_categorie) VALUES'
                for (var key in data) {
                    if (/^categorie[0-9]*$/.test(key)) {
                        if (data[key] != '') {
                            todo = true;
                            var id_categorie = key.match(/^categorie([0-9]*)$/)[1];
                            query += '($1, $' + counter + '),';
                            counter += 1;
                            array.push(id_categorie);
                        }
                    }
                }
                query = query.substring(0, query.length - 1) + ';';
                console.log(query);
                console.log(array);

                if (todo == true) {
                    client.query(query, array, after_categorie);
                }
                else after_categorie(null, null);


            });
        };

        function after_categorie(err, results) {

            if (err) return rollback(client, err);
            //end transaction
            client.query('COMMIT', client.end.bind(client));
            cb(null, {ok: 'ok'});
        };
    }
};
