var pg = require('pg');
var async = require('async');

module.exports = {
    get_random_recettes: function (cb) {
        var pool = new pg.Pool(config);
        pool.on('error', function (err, client) {console.error('idle client error', err.message, err.stack)});
        var return_data = {};

        async.parallel([
            function (parallel_done) {
                pool.connect(function (err, client, done) {
                    if (err) {
                        return parallel_done(err);
                    }
                    client.query('SELECT * FROM recette ORDER BY random() LIMIT 3;', function (err2, result) {
                        done();

                        if (err2) {
                            return parallel_done(err2);
                        }
                        return_data.recettes = result.rows;
                        parallel_done();
                    });
                });
            }
        ], function(err) {
            pool.end();
            if (err) return cb(err);
            cb(null, return_data);
        });

    }
};
