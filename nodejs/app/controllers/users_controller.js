var users_model = require('../models/users_model');


module.exports = {
    index: function(req, res) {
        res.status(200).json({
            count: 1,
            users: [
                {
                    id: 0,
                    name: 'Tom',
                    password: '$DXEc584D5D1dDe9220'
                }
            ]
        });
    },

    setup: function (req, res) {
        users_model.setup(function (err, id) {
            res.status(200).json(id);
        })
    },

    list_users: function (req, res) {
        users_model.get_all_users(function (err, users) {
            res.json(users);
        })
    },

    authenticate: function (req, res) {
        var login = req.body.login_username;
        var password = req.body.login_password;
        users_model.authenticate(login, password, req.app.settings.config, function (err, data) {
            if (err) {
                return res.status(500).json(err);
            }
            res.json(data);
        })
    },

    register: function (req, res) {
        var login = req.body.register_username;
        var password = req.body.register_password;
        users_model.register(login, password, req.app.settings.config, function (err, data) {
            if (err) {
                return res.status(500).json(err);
            }
            res.json(data);
        })
    },
    
    validate_token: function (req, res, next) {
        //Check header or url parameters or post parameters for token
        var token = req.body.token || req.query.token || req.headers['x-access-token'];
        console.log(token);

        //decode then
        users_model.validate_token(token, req.app.settings.config, function (err, data, decoded) {
            if (err) {
                return res.status(500).json(err);
            }
            if (data) {
                return res.status(403).json(data);
            }
            if (decoded) {
                // if everything is good, save to request for use in other routes
                req.decoded = decoded;
                next();
            }
        })
    }
};