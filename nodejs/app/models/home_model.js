var pg = require('pg');
var async = require('async');

var config = {
    user: 'reader',
    database: 'cuisine',
    password: 'reader'
};

module.exports = {
    get_random_recettes: function (cb) {
        var pool = new pg.Pool(config);
        var return_data = {};

        async.parallel([
            function (parallel_done) {
                pool.connect(function (err, client, done) {
                    if (err) {
                        return cb(err);
                    }
                    client.query('SELECT * FROM recette ORDER BY random() LIMIT 3;', function (err2, result) {
                        done();

                        if (err2) {
                            return cb(err2);
                        }
                        return_data.recettes = result.rows;
                        console.log(result.rows);
                        parallel_done();
                    });
                });
            }
        ], function(err) {
            pool.end();
            if (err) return cb(err);
            cb(null, return_data);
        });

        pool.on('error', function (err, client) {
            // if an error is encountered by a client while it sits idle in the pool
            // the pool itself will emit an error event with both the error and
            // the client which emitted the original error
            // this is a rare occurrence but can happen if there is a network partition
            // between your application and the database, the database restarts, etc.
            // and so you might want to handle it and at least log it out
            console.error('idle client error', err.message, err.stack)
        })
    }
};
