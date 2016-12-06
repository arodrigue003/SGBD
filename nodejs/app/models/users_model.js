/**
 * Created by adrien on 06/12/16.
 */
var pg = require('pg');
var jwt = require('jsonwebtoken');
var sync = require('synchronize');
var fiber = sync.fiber;
var await = sync.await;
var defer = sync.defer;
var defers = sync.defers;

var superSecret = 'I love tentacles';
var config = {
    user: 'reader',
    database: 'cuisine',
    password: 'reader'
};

module.exports = {
    setup: function (cb) {
        var user = {
            pseudo: 'setup',
            password: 'coucou'
        };
        var pool = new pg.Pool(config);
        pool.connect(function (err, client, done) {
            if (err) {
                return cb(err);
            }
            client.query('INSERT INTO internaute (pseudonyme, mot_de_passe) \
                    SELECT $1::text, $2::text \
                    WHERE \
                    NOT EXISTS ( \
                        SELECT * \
                        from internaute \
                    WHERE pseudonyme=$3::text \
                    ) \
                    RETURNING id_internaute;', [user.pseudo, user.password, user.pseudo], function (err2, result) {
                done();

                if (err2) {
                    return cb(err2);
                }

                pool.end();
                console.log(result.rows[0]);
                cb(null, {id: result.rows[0]});
            });
        });
    },

    get_all_users: function (cb) {
        var pool = new pg.Pool(config);
        pool.connect(function (err, client, done) {
            if (err) {
                return cb(err);
            }
            client.query('SELECT * FROM internaute;', function (err2, result) {
                done();

                if (err2) {
                    return cb(err2);
                }

                pool.end();
                cb(null, result.rows);
            });
        });
    },

    authenticate: function (login, password, config, cb) {

        console.log(config);
        fiber(function () {

            try {

                var pool = new pg.Pool(config.config);
                var id_internaute;

                var connect = await(pool.connect(defers('client', 'done')));
                var results = await(connect.client.query('SELECT * FROM internaute WHERE pseudonyme = $1;', [login], defer()));
                connect.done();

                // if user doesn't exists create it and get his id else we are fine
                if (results.rows[0] == undefined) {
                    return cb({ success: false, message: 'Authentication failed. User not found.' });
                }

                // check if password matches
                else if (results.rows[0].mot_de_passe != password) {
                    return cb({ success: false, message: 'Authentication failed. Wrong password.' });
                }

                // if user is found and password is right
                // create a token
                var token = jwt.sign({login: login}, config.superSecret, {
                    algorithm: 'HS256',
                    expiresIn: "2 days" // expires in 24 hours
                });

                // return the information including token as JSON
                cb(null, {
                    success: true,
                    message: 'Enjoy your token!',
                    token: token
                });
                pool.end();

                pool.on('error', function (err, client) {
                    // if an error is encountered by a client while it sits idle in the pool
                    // the pool itself will emit an error event with both the error and
                    // the client which emitted the original error
                    // this is a rare occurrence but can happen if there is a network partition
                    // between your application and the database, the database restarts, etc.
                    // and so you might want to handle it and at least log it out
                    console.error('idle client error', err.message, err.stack)
                });

            } catch (err) {
                console.log(err);
                cb(err);
            }

        });
    },

    validate_token: function (token, config, cb) {

        // decode token
        if (token) {

            // verifies secret and checks exp
            jwt.verify(token, config.superSecret, function (err, decoded) {
                if (err) {
                    return cb(null, {success: false, message: 'Failed to authenticate token.'});
                } else {
                    return cb(null, null, true);
                }
            });

        } else {

            // if there is no token
            // return an error
            return cb({
                success: false,
                message: 'No token provided.'
            });

        }
    }
};