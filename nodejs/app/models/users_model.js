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

module.exports = {
    setup: function (config, cb) {
        var user = {
            pseudo: 'setup',
            password: 'coucou'
        };
        var pool = new pg.Pool(config.config);
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
                cb(null, {id: result.rows[0]});
            });
        });
    },

    get_all_users: function (config, cb) {
        var pool = new pg.Pool(config.config);
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
        fiber(function () {

            try {

                var pool = new pg.Pool(config.config);
                pool.on('error', function (err, client) {console.error('idle client error', err.message, err.stack)});

                var connect = await(pool.connect(defers('client', 'done')));
                var results = await(connect.client.query('SELECT * FROM internaute WHERE pseudonyme = $1;', [login], defer()));
                connect.done();

                // if user doesn't exists create it and get his id else we are fine
                if (results.rows[0] == undefined) {
                    return cb({ message: 'Authentication failed. User not found.', status: 403 });
                }

                // check if password matches
                else if (results.rows[0].mot_de_passe != password) {
                    return cb({ message: 'Authentication failed. Wrong password.', status: 403 });
                }

                // if user is found and password is right
                // create a token
                var token = jwt.sign({login: login, id:results.rows[0].id_internaute}, config.superSecret, {
                    algorithm: 'HS256',
                    expiresIn: "1 days" // expires in 24 hours
                });

                // return the information including token as JSON
                pool.end();
                return cb(null, {
                    message: 'Login success',
                    token: token
                });

            } catch (err) {
                return cb({message: err.message, status: 500 });
            }
        });
    },

    register: function (login, password1, password2, config, cb) {
        var pseudo_reg = new RegExp("^\\w*$");

        if (login.length < 3) {
            return cb({message: 'Login too short.', status: 400});
        } else if (!pseudo_reg.test(login)) {
            return cb({message: 'Incorrect syntax (letters and numbers only).', status: 400});
        } else if (password1.length < 3) {
            return cb({message: 'password too short.', status: 400});
        } else if (password1 != password2) {
            return cb({message: 'passwords don\'t match.', status: 400});
        }

        fiber(function () {
            try {
                var pool = new pg.Pool(config.config);
                pool.on('error', function (err, client) { console.error('idle client error', err.message, err.stack) });

                var connect = await(pool.connect(defers('client', 'done')));
                var results = await(connect.client.query('SELECT internaute.id_internaute AS id_internaute FROM internaute WHERE pseudonyme = $1;', [login], defer()));
                connect.done();

                // if user already exists don't allow register
                if (results.rows[0] != undefined) {
                    return cb({message: 'User already exists.', status: 403});
                }

                connect = await(pool.connect(defers('client', 'done')));
                await(connect.client.query('INSERT INTO internaute (pseudonyme, mot_de_passe) \
                                                VALUES($1::text, $2::text)', [login, password1], defer()));
                connect.done();

                pool.end();
                return cb(null, {
                    message: 'Register success'
                });

            } catch (err) {
                return cb({message: err.message, status: 500 });
            }
        });
    },

    validate_token: function (token, config, cb) {

        console.log(token);
        // decode token
        if (token && token != "null") {
            // verifies secret and checks exp
            jwt.verify(token, config.superSecret, function (err, decoded) {
                if (err) {
                    return cb({message: 'Failed to authenticate token.', status: 403});
                } else if (decoded.exp <= Date.now()/1000) {
                    return cb({message: 'Access token has expired', status: 403});
                } else {
                    return cb(null, decoded);
                }
            });
        } else {
            // if there is no token
            // return an error
            return cb({
                message: 'No token provided.',
                status: 400
            });

        }
    }

};
