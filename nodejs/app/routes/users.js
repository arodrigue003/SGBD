var express = require('express');
var router = express.Router();

var users_controller = require('../controllers/users_controller');

router.get('/', users_controller.index);

module.exports = router;
