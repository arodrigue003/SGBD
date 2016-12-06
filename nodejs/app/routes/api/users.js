/**
 * Created by adrien on 06/12/16.
 */
var express = require('express');
var router = express.Router();

var users_controller = require('../../controllers/users_controller');

router.get('/setup', users_controller.setup);
router.get('/list', users_controller.list_users);
router.post('/authenticate', users_controller.authenticate);

module.exports = router;