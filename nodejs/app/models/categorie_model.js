var pg = require('pg');

var db = require("./db");

module.exports = {
    get_noms: function (cb) {
        var pool = new pg.Pool(db.get_config());

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


        pool.on('error', function(err, client) {
            cb(err);
        });
    }
};