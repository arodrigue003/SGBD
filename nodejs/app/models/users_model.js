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
                pool.on('error', function (err, client) {console.error('idle client error', err.message, err.stack)});
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
                    expiresIn: "1 days" // expires in 24 hours
                });

                // return the information including token as JSON
                pool.end();
                return cb(null, {
                    success: true,
                    message: 'Login success',
                    token: token
                });

            } catch (err) {
                console.log(err);
                cb(err);
            }

        });
    },

    register: function (login, password1, password2, config, cb) {
        var pseudo_reg = new RegExp("^\\w*$");

        if (login.length < 3) {
            return cb({success: false, message: 'Login too short.'});
        } else if (!pseudo_reg.test(login)) {
            return cb({success: false, message: 'Incorrect syntax (letters and numbers only).'});
        } else if (password1.length < 3) {
            return cb({success: false, message: 'password too short.'});
        } else if (password1 != password2) {
            return cb({success: false, message: 'passwords don\'t match.'});
        }

        fiber(function () {
            try {
                var pool = new pg.Pool(config.config);

                var connect = await(pool.connect(defers('client', 'done')));
                var results = await(connect.client.query('SELECT internaute.id_internaute AS id_internaute FROM internaute WHERE pseudonyme = $1;', [login], defer()));
                connect.done();

                // if user already exists don't allow register
                if (results.rows[0] != undefined) {
                    return cb({success: false, message: 'User already exists.'});
                }

                var connect = await(pool.connect(defers('client', 'done')));
                var results = await(connect.client.query('INSERT INTO internaute (pseudonyme, mot_de_passe) \
                                    VALUES($1::text, $2::text)', [login, password1], defer()));
                connect.done();

                return cb(null, {
                    success: true,
                    message: 'Register success'
                });

            } catch (err) {
                return cb(err);
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
                } else if (decoded.exp <= Date.now()/1000) {
                    return cb(null, {success: false, message: 'Access token has expired'});
                } else {
                    return cb(null, null, true);
                }
            });

        } else {

            // if there is no token
            // return an error
            return cb(null, {
                success: false,
                message: 'No token provided.'
            });

        }
    }
};