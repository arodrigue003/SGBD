var pg = require('pg');

var config = {
    user: 'reader',
    database: 'cuisine',
    password: 'reader'
};

module.exports = {
    get_from_id: function(id, cb) {
        var client = new pg.Client(config);

        client.connect(function (err) {
            if (err) {
                return cb(err);
            }

            client.query('SELECT * FROM recette WHERE id_recette = $1::int;', [id], function (err2, result) {
                if (err2) {
                    return cb(err2);
                }

                cb(null, result.rows[0]);
            });
        });
    }
};