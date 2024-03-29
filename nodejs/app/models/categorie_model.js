var pg = require('pg');

module.exports = {
    get_nom: function(config, id, cb) {
        var pool = new pg.Pool(config);
        pool.on('error', function(err, client) {console.error('idle client error', err.message, err.stack)});

        pool.connect(function(err, client, done) {
            if (err) {
                return cb(err);
            }
            client.query(
                "SELECT id_categorie, nom_categorie FROM CATEGORIE WHERE id_categorie = $1::int",
                [id],
                function (err1, result) {
                    if (err1) {
                        return cb(err1);
                    }

                    done();
                    cb(null, result.rows);
                });
        });
    },

    get_noms: function (config, cb) {
        var pool = new pg.Pool(config);
        pool.on('error', function(err, client) {console.error('idle client error', err.message, err.stack)});

        pool.connect(function(err, client, done) {
            if (err) {
                return cb(err);
            }
            client.query(
                "SELECT id_categorie, nom_categorie FROM CATEGORIE",
                function (err1, result) {
                    if (err1) {
                        return cb(err1);
                    }

                    done();
                    cb(null, result.rows);
                });
        });
    }
};