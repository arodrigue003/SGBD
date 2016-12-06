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
        users_model.authenticate(login, password, function (err, data) {
            if (err) {
                return res.status(500).json(err);
            }
            res.json(data);
        })
    }
};