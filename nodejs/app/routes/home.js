var express = require('express');
var router = express.Router();

var home_controller = require('../controllers/home_controller');

router.get('/', home_controller.index);

module.exports = router;